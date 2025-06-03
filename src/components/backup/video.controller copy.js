import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import Channel from "../models/Channel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { getVideoDuration } from "../helper/getVideoDuration.js";
import Ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import os from "os";
import { rimraf } from "rimraf";
import { v4 as uuidv4 } from "uuid";

// async function segmentVideo(videoPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     Ffmpeg(videoPath)
//       .addInputOption("-re") // Real-time processing
//       .output(`${outputDir}/segment_%03d.mp4`)
//       .outputFormat("segment")
//       .addOutputOption("-segment_time", "10")
//       .addOutputOption("-reset_timestamps", "1")
//       .on("progress", (progress) => {
//         console.log(`Segmenting progress: ${progress.percent.toFixed(2)}%`);
//       })
//       .on("end", resolve)
//       .on("error", reject)
//       .run();
//   });
// }

// async function segmentVideo(videoPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     Ffmpeg(videoPath)
//       .addInputOption("-re")
//       .output(`${outputDir}/output.m3u8`)
//       .outputFormat("hls")
//       .addOutputOption("-hls_time", "10") // 10 second segments
//       .addOutputOption("-hls_list_size", "0")
//       .addOutputOption("-f", "hls")
//       .on("progress", (progress) => {
//         console.log(`HLS generation progress: ${progress.percent.toFixed(2)}%`);
//       })
//       .on("end", resolve)
//       .on("error", reject)
//       .run();
//   });
// }
// async function uploadSegments(outputDir) {
//   const segmentFiles = fs.readdirSync(outputDir);
//   const segmentUrls = [];

//   for (const file of segmentFiles) {
//     const filePath = path.join(outputDir, file);
//     const result = await uploadOnCloudinary(filePath);
//     segmentUrls.push(result.url);
//   }

//   return segmentUrls;
// }

// const uploadVideo = asyncHandler(async (req, res) => {
//   const userId = req.user.id;
//   if (!userId) {
//     throw new ApiError(400, "User ID is required");
//   }

//   // Find the user's channel
//   const channel = await Channel.findOne({ where: { ownerId: userId } });
//   if (!channel) {
//     throw new ApiError(
//       400,
//       "User does not have a channel. Please create a channel first."
//     );
//   }

//   const { title, description } = req.body;

//   const videoFile = req.files?.videoFile?.[0]?.path;
//   const thumbnail = req.files?.thumbnail?.[0]?.path;

//   if (!videoFile || !thumbnail) {
//     throw new ApiError(400, "Video file and thumbnail are required");
//   }

//   // Get duration using ffmpeg
//   let duration;
//   try {
//     duration = await getVideoDuration(videoFile);
//   } catch (error) {
//     throw new ApiError(500, "Failed to read video duration");
//   }

//   // Segment the video
//   const tempDir = path.join(os.tmpdir(), uuidv4());
//   fs.mkdirSync(tempDir);

//   try {
//     await segmentVideo(videoFile, tempDir);
//     const segmentUrls = await uploadSegments(tempDir);

//     // Upload thumbnail
//     const uploadedThumbnail = await uploadOnCloudinary(thumbnail);

//     // Create video entry
//     const video = await Video.create({
//       title,
//       description,
//       duration,
//       videoFile: segmentUrls, // Store array of segment URLs
//       thumbnail: uploadedThumbnail.url,
//       ownerId: userId,
//       channelId: channel.id,
//     });

//     res
//       .status(201)
//       .json(new ApiResponse(201, video, "Video published successfully"));
//   } finally {
//     // Clean up temporary directory
//     rimraf.sync(tempDir);
//   }
// });

async function convertToHLS(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
    Ffmpeg(videoPath)
      .addInputOption("-re")
      .output(`${outputDir}/output.m3u8`)
      .outputFormat("hls")
      .addOutputOption("-hls_time", "10") // 10 second segments
      .addOutputOption("-hls_list_size", "0")
      .addOutputOption("-f", "hls")
      .on("progress", (progress) => {
        console.log(
          `HLS generation progress: ${progress.percent?.toFixed(2)}%`
        );
      })
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

const uploadVideo = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) throw new ApiError(400, "User ID is required");

  const channel = await Channel.findOne({ where: { ownerId: userId } });
  if (!channel) throw new ApiError(400, "Channel not found");

  const { title, description } = req.body;

  const videoFile = req.files?.videoFile?.[0]?.path;
  const thumbnail = req.files?.thumbnail?.[0]?.path;

  if (!videoFile || !thumbnail)
    throw new ApiError(400, "Video and thumbnail are required");

  let duration;
  try {
    duration = await getVideoDuration(videoFile);
  } catch (err) {
    throw new ApiError(500, "Failed to get video duration");
  }

  const tempDir = path.join(os.tmpdir(), uuidv4());
  fs.mkdirSync(tempDir);

  try {
    // Step 1: Convert to HLS
    await convertToHLS(videoFile, tempDir);

    // Step 2: Upload `.m3u8` file to Cloudinary
    const playlistPath = path.join(tempDir, "output.m3u8");
    const uploadedPlaylist = await uploadOnCloudinary(playlistPath);

    // Step 3: Upload thumbnail
    const uploadedThumbnail = await uploadOnCloudinary(thumbnail);

    // Step 4: Save to DB
    const video = await Video.create({
      title,
      description,
      duration,
      videoFile: uploadedPlaylist.url, // single URL now
      thumbnail: uploadedThumbnail.url,
      ownerId: userId,
      channelId: channel.id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, video, "Video uploaded successfully"));
  } finally {
    rimraf.sync(tempDir); // Cleanup
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "DESC",
  } = req.query;

  const whereClause = query
    ? {
        title: {
          [Sequelize.Op.iLike]: `%${query}%`,
        },
      }
    : {};

  const videos = await Video.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    order: [[sortBy, sortType]],
    include: [
      {
        model: Channel,
        as: "channel",
        attributes: ["id", "name", "handle", "profilePicture"],
      },
    ],
  });

  res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findByPk(videoId, {
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "username", "avatar"],
      },
      {
        model: Channel,
        as: "channel",
        attributes: ["id", "name", "profilePicture"],
      },
    ],
  });

  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  // Add this line for easier access
  video.dataValues.streamUrl = video.videoFile?.[0]; // You can later replace with .m3u8 file
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  const video = await Video.findByPk(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (req.file) {
    const thumbnailPath = req.file.path;
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath);
    video.thumbnail = uploadedThumbnail.url;
  }

  video.title = title || video.title;
  video.description = description || video.description;

  await video.save();

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findByPk(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  await video.destroy();

  res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findByPk(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  video.isPublished = !video.isPublished;
  await video.save();

  res
    .status(200)
    .json(new ApiResponse(200, video, "Publish status toggled successfully"));
});

export {
  getAllVideos,
  uploadVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
