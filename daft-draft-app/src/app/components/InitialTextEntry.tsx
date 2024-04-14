
type InitialTextEntryProps = {
  givenText: string;
  setGivenText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const InitialTextEntry = ({ givenText, setGivenText, handleSubmit }: InitialTextEntryProps) => {
  return (
    <form onSubmit={handleSubmit}
      id="initTextForm"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%'
      }}
    >
      <textarea
        value={givenText}
        onChange={(e) => setGivenText(e.target.value)}
        placeholder="Paste your draft abstract here..."
        style={{
          width: '100%', // Makes the textarea fill the width of its container
          minHeight: '50%', // Sets a minimum height for the textarea
          resize: 'none' // Optional: prevents the user from manually resizing the textarea
        }}
      />
    </form>
  );
};
