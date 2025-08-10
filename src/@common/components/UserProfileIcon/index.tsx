import type { FC } from 'react'

interface IUserProfileIcon {
    size?: number,
    img: {
        src: string,
        alt: string
    },
}
export const UserProfileIcon: FC<IUserProfileIcon> = ({
  img,
  size = 60
}) => (
  <img
    src={img?.src}
    alt={img?.alt}
    className="w-16 h-16 rounded-full object-cover"
    style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '1px solid #F5F5F580' }}
  />
)
