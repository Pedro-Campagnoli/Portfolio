export default function SectionLabel({
  file,
  describe,
}: {
  file: string;
  describe: string;
}) {
  return (
    <div className="text-primary-text flex flex-col text-start font-mono text-[10px] md:text-xs leading-relaxed">
      <p>{file}</p>
      <div>
        <span style={{ color: "var(--section-keyword)" }}>describe</span>
        <span style={{ color: "var(--section-punctuation)" }}> (</span>
        <span style={{ color: "var(--section-string)" }}>
          {`'${describe}'`}
        </span>
        <span style={{ color: "var(--section-punctuation)" }}>, </span>
        <span style={{ color: "var(--section-callback)" }}>{"() => {"}</span>
      </div>
    </div>
  );
}
