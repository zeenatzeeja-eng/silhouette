const CLOUDINARY_HOST = "res.cloudinary.com";

export function isCloudinary(url) {
	return typeof url === "string" && url.includes(CLOUDINARY_HOST);
}

// Cloudinary URL mein format, quality aur width ka transform lagata hai
export function cloudinaryUrl(url, { width = 1000, quality = "auto" } = {}) {
	if (!isCloudinary(url) || !url.includes("/upload/")) return url;
	return url.replace(
		"/upload/",
		`/upload/f_auto,q_${quality},w_${width},c_limit/`,
	);
}
