import { ImgHTMLAttributes } from 'react';
import icon from '../../../public/favicon.svg';
import logo from '../../../public/apple-touch-icon.png';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={icon ?? logo}
            {...props}
            width={props.width ?? 40}
            height={props.height ?? 42}
            alt={props.alt ?? "App logo"}
        />
    );
}
