type Props = {
	/** Visible wordmark text (parent link should carry aria-label). */
	label?: string;
	className?: string;
};

/** PUBG wordmark — HTML text so stale SVG/CDN assets cannot show old template branding. */
export default function BrandLogo({ label = 'PUBG HACKS', className }: Props) {
	return (
		<span className={className} aria-hidden="true">
			{label}
		</span>
	);
}
