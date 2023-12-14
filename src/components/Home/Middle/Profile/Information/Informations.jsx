import React from 'react'
import Colors from '../../../../../constants/Colors.ts'
const Informations = ({data}) => {
  const generateRandomColors = () => {
    for (let i = Colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [Colors[i], Colors[j]] = [Colors[j], Colors[i]];
    }

    return Colors;
  };
  const badgeColors = generateRandomColors();
  return (
    <div className='mb-4 max-w-[42rem] w-full flex flex-col p-6 bg-card dark:shadow-black/20 shadow-xl shadow-zinc-200 ring-1 ring-lightGray rounded-2xl gap-2 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray'>
      <span className="font-main text-lg text-darkBlue dark:text-white2 font-semibold">About me</span>
      <span className="text-sm text-gray break-words leading-5 dark:text-darkWhite font-main whitespace-pre-line">{data.bio}</span>
      <span className="font-main text-lg text-darkBlue dark:text-white2 font-semibold mt-4">Skills</span>
      <div className="flex flex-wrap">
        {data.skills.map((skill, index) => (
          <div
            className={`mr-2 mb-2 rounded-lg px-2 py-1 flex items-center justify-center text-xs font-medium font-main ${badgeColors[index].background} ${badgeColors[index].text} rounded-md`}
            key={index}
          >
            <span className="">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Informations