type PageContainerProps = {
  children: React.ReactNode;
  pageTitle: string;
  alignBottom?: boolean;
  alignCenter?: boolean;
};

const PageContainer = ({ children, pageTitle, alignBottom, alignCenter }: PageContainerProps) => {
  return(
    <div className="relative grow flex flex-col min-h-0">
      {pageTitle &&
        <h1 className="font-black text-[48px] underline mb-5">
          {pageTitle.toUpperCase()}
        </h1>
      }
      <div className={`relative flex-1 overflow-y-scroll overflow-x-hidden pb-24 pr-1 ${alignBottom && "flex flex-col justify-end pb-30"} ${alignCenter && "flex flex-col justify-center"}`}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;