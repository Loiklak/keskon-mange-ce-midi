import { FC, PropsWithChildren } from "react";

const Tag: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="px-2 rounded-xl border-solid border-gray-300 border-2">
      {children}
    </div>
  );
};

export default Tag;
