export const NotSupport: Component<{
  text?: string;
}> = ({ text }) => {
  return (
    <div className="flex h-[100px] items-center justify-center text-lg font-medium">
      {text || "This function is not supported on your region"}
    </div>
  );
};
