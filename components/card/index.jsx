import React from "react";

const Card = ({ Text, Number }) => {
  return (
    <div className="min-h-[50px] min-w-[120px] bg-gradientPrimary rounded-[10px] pt-6 px-4 text-white">
      <h2>{Text}</h2>
      <h1>{Number}</h1>
    </div>
  );
};

export default Card;
