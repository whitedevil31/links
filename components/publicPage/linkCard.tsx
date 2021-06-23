
import React from "react";
import { MdContentCopy } from "react-icons/md";
import { errorHandler, successHandler } from "../../utils/api";

import { kzillaxyzdomain } from "../../utils/constants";
import { truncateText } from "../../utils/functions";
import { NewWindow } from "../../assets/icons";

interface LinkCardProps {
    title: string;
    shortCode: string;
    image: string;
}

const LinkCard = ({ title, shortCode, image }: LinkCardProps): JSX.Element => {
    const copyToClipBoard = async (copyMe) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            successHandler("📋 Link copied to clipboard!");
        } catch (err) {
            // errorHandler(err);
        }
    };

    return (
        <>
            <div className="relative flex flex-row w-full bg-white my-2 rounded-lg p-4 shadow-lg lg:shadow-none border lg:border-none">
                <img className="rounded w-10 h-10" src={image} />
                <h1 className="w-full my-2 mx-5 text-lightgray font-bold text-xl lg:text-lg">
                    {truncateText(title, 20, 15)}
                </h1>
                <a href={`${kzillaxyzdomain}${shortCode}`} target="_blank" rel="noopener noreferrer" className="z-50 mx-2 p-1 border rounded my-auto text-lightgray" onClick={() => copyToClipBoard(`${kzillaxyzdomain}${shortCode}`)}>
                    <NewWindow />
                </a>
                <a className="z-50 p-2 border rounded my-auto text-lightgray cursor-pointer" onClick={() => copyToClipBoard(`${kzillaxyzdomain}${shortCode}`)}>
                    <MdContentCopy />
                </a>
            </div>
        </>
    );
}
export default LinkCard;