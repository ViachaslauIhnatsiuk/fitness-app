import React, { ChangeEvent, FC, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { storage, ref, getDownloadURL, uploadBytes } from '../../../firebase/firebase';
import { AvatarProps } from './models';
import avatar from '../../../assets/avatar.svg';
import s from './Avatar.module.css';

const Avatar: FC<AvatarProps> = ({ imageUrl, setImageUrl }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    if (file) setImage(file);
  };

  const handleImageSubmit = async () => {
    const imageRef = ref(storage, `avatars/${image?.name as string}`);
    setImage(null);
    await uploadBytes(imageRef, image as File);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
  };

  return (
    <div className={s.avatar}>
      <div className={s.image_wrapper}>
        <img className={s.image} src={imageUrl || avatar} alt="avatar" />
      </div>
      {image ? (
        <AiOutlineCheck className={s.check} onClick={handleImageSubmit} />
      ) : (
        <label htmlFor="edit" className={s.edit_label}>
          <MdModeEditOutline className={s.edit_icon} />
          <input id="edit" type="file" className={s.edit} onChange={(e) => handleImageChange(e)} />
        </label>
      )}
    </div>
  );
};

export { Avatar };
