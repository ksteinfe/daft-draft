// components/InitialTextSubmission.tsx

type InitialTextSubmissionProps = {
    givenText: string;
    setGivenText: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  };
  
  export const InitialTextSubmission = ({ givenText, setGivenText, handleSubmit }: InitialTextSubmissionProps) => {
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={givenText}
          onChange={(e) => setGivenText(e.target.value)}
          placeholder="Enter text here..."
          rows={20}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };
  