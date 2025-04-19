type Props = {
  currentFolder?: string;
  currentWorkspace?: string;
  videoId: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  currentFolder,
  currentFolderName,
  currentWorkspace,
  videoId,
}: Props) => {
  return <h1>Change location</h1>;
};

export default ChangeVideoLocation;
