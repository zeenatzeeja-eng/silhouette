import Image from "next/image";

// Default: parent (relative aspect box) ko poora bharti hai, taake dono images overlap hon.
// Sirf width aur height dye jayen to unhi se size hoga.
export default function RevealImage({
	className = "",
	fill,
	width,
	height,
	style,
	...props
}) {
	const useFill = fill ?? !(width && height);
	const sizeProps = useFill ? { fill: true } : { width, height, style };

	return (
		<Image {...props} {...sizeProps} className={`object-cover ${className}`} />
	);
}
