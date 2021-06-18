const Emoji = ({ children, label = "" }) => (
	<span role="img" aria-labelledby={label}>
		{children}
	</span>
);

export default Emoji;
