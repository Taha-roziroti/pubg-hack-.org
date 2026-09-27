type Props = {
	/** Accessible label when the logo is decorative inside a named link */
	alt?: string;
	className?: string;
};

/** PUBG Hack wordmark — SVG nav asset (purple gradient, no template branding). */
export default function BrandLogo({ alt = 'PUBG Hack logo', className }: Props) {
	return (
		<img
			className={className}
			src="/pubg-cheats-logo-nav.svg"
			width={200}
			height={28}
			alt={alt}
			decoding="async"
			fetchPriority="high"
		/>
	);
}
