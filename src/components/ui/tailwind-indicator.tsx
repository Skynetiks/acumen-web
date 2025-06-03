const TailwindIndicator = () => {
  return (
    <div className="fixed bottom-0 right-0">
      <div className="sm:hidden">Base</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">2XL</div>
      <div className="hidden 3xl:block">3XL</div>
    </div>
  );
};

export default TailwindIndicator;
