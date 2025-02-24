import React, { useState } from "react";

const DEFAULT_AVATAR = "/avatar-default.svg";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    url?: string;
    size?: "sm" | "md" | "lg";
}

export const Avatar = ({ size = "md", ...props }: AvatarProps) => {
    const [imgError, setImgError] = useState(false);
    const avatarSrc = imgError ? DEFAULT_AVATAR : props.url || DEFAULT_AVATAR;

    return (
        <img
            {...props}
            src={avatarSrc}
            onError={() => setImgError(true)}
            style={{
                borderRadius: "100%",
                width: size === "sm" ? "3rem" : size === "md" ? "4rem" : "5rem",
                height:
                    size === "sm" ? "3rem" : size === "md" ? "4rem" : "5rem",
                ...props.style,
            }}
        />
    );
};
