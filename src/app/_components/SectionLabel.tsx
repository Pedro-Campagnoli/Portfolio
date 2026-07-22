export default function SectionLabel({ file, describe }: { file: string; describe: string }) {
  return (
    <div className="text-primary-text flex flex-col text-start font-mono text-[10px] md:text-xs leading-relaxed">
      <p>{file}</p>
      <div>
        <span className="text-warning">describe</span> 
        <span className="text-info"> (</span>
        <span className="text-success">{`'${describe}'`}</span>,
        <span className="text-primary"> {"() => {"}</span>
      </div>
    </div>
  );
}
