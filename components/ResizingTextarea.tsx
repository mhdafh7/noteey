import ReactTextareaAutosize from "react-textarea-autosize";

type ResizingTextareaProps = {
  name?: string;
  styles: any;
  value: string | undefined | any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
};

const ResizingTextarea = ({
  name,
  styles,
  onChange,
  onBlur,
  value,
}: ResizingTextareaProps) => {
  return (
    <ReactTextareaAutosize
      name={name}
      className={styles}
      minRows={6}
      maxRows={14}
      maxLength={1000}
      placeholder="Note description..."
      autoComplete="off"
      onBlur={onBlur}
      value={value}
      onChange={onChange}
    />
  );
};
export default ResizingTextarea;
