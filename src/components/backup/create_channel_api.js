export const createChannel = async (req, res) => {
	//   const { profilePicture, bannerPicture } = req.files;
	const { name, handle, description } = req.body;

	if (!name) {
		return res.status(400).json(new ApiResponse(400, null, "Channel name is required"));
	}

	// Check if the user already has a channel
	const existingChannel = await Channel.findOne({
		where: { ownerId: req.user.id },
	});

	if (existingChannel) {
		return res.status(400).json(new ApiResponse(400, null, "You already have a channel. You cannot create multiple channels."));
	}

	//   let profilePictureUrl = "";
	//   let bannerPictureUrl = "";

	//   // Handle profile picture upload
	//   if (profilePicture && profilePicture.length > 0) {
	//     const profilePictureLocalPath = profilePicture[0].path;

	//     if (!profilePictureLocalPath) {
	//       return res
	//         .status(400)
	//         .json(new ApiResponse(400, null, "Profile picture file is missing"));
	//     }

	//     try {
	//       const profilePictureResult = await uploadOnCloudinary(
	//         profilePictureLocalPath
	//       );
	//       profilePictureUrl = profilePictureResult.url;
	//     } catch (error) {
	//       console.error("Error uploading profile picture:", error);
	//       return res
	//         .status(500)
	//         .json(new ApiResponse(500, null, "Failed to upload profile picture"));
	//     }
	//   }

	//   // Handle banner picture upload
	//   if (bannerPicture) {
	//     try {
	//       const bannerPictureLocalPath = bannerPicture[0].path;
	//       const bannerPictureResult = await uploadOnCloudinary(
	//         bannerPictureLocalPath
	//       );
	//       bannerPictureUrl = bannerPictureResult.url;
	//     } catch (error) {
	//       console.error("Error uploading banner picture:", error);
	//       return res
	//         .status(500)
	//         .json(new ApiResponse(500, null, "Failed to upload banner picture"));
	//     }
	//   }

	const profilePictureLocalPath = req.files?.avatar?.[0]?.path;
	const bannerPictureLocalPath = req.files?.coverImage?.[0]?.path;

	const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
	const bannerPicture = await uploadOnCloudinary(bannerPictureLocalPath);

	const newChannel = await Channel.create({
		name,
		handle,
		description,
		profilePicture: profilePicture?.url || "",
		bannerPicture: bannerPicture?.url || "",
		// profilePicture: profilePictureUrl,
		// bannerPicture: bannerPictureUrl,
		// profilePicture,
		// bannerPicture,
		ownerId: req.user.id,
	});

	res.status(201).json(new ApiResponse(201, newChannel, "Channel created successfully"));
};
