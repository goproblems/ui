import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowRight,
    faArrowsLeftRightToLine,
    faBell,
    faBolt,
    faChartColumn,
    faCheck,
    faCircleCheck,
    faCircleInfo,
    faFileLines,
    faGem,
    faHeart,
    faLock,
    faPen,
    faPeopleGroup,
    faPersonCirclePlus,
    faPersonCircleMinus,
    faPlay,
    faTrophy,
    faWandMagicSparkles,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import type {ComponentProps} from 'react';
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';

type IconProps = Omit<ComponentProps<typeof FontAwesomeIcon>, 'icon' | 'size'> & {
    size?: number | string;
};

const makeIcon =
    (icon: IconDefinition) =>
    ({size, style, ...props}: IconProps) => (
        <FontAwesomeIcon
            {...props}
            icon={icon}
            style={{
                ...style,
                ...(typeof size === 'number'
                    ? {height: size, width: size}
                    : undefined),
            }}
            size={
                typeof size === 'string'
                    ? (size as ComponentProps<typeof FontAwesomeIcon>['size'])
                    : undefined
            }
        />
    );

export const ArrowLeft = makeIcon(faArrowLeft);
export const ArrowRight = makeIcon(faArrowRight);
export const ArrowRightShort = makeIcon(faArrowRight);
export const ArrowsCollapse = makeIcon(faArrowsLeftRightToLine);
export const BarChartFill = makeIcon(faChartColumn);
export const BellFill = makeIcon(faBell);
export const CheckCircleFill = makeIcon(faCircleCheck);
export const CheckSquare = makeIcon(faCheck);
export const DiamondFill = makeIcon(faGem);
export const FileText = makeIcon(faFileLines);
export const FileTextFill = makeIcon(faFileLines);
export const Heart = makeIcon(faHeart);
export const HeartFill = makeIcon(faHeart);
export const InfoCircle = makeIcon(faCircleInfo);
export const LightningChargeFill = makeIcon(faBolt);
export const LightningFill = makeIcon(faBolt);
export const Lock = makeIcon(faLock);
export const Magic = makeIcon(faWandMagicSparkles);
export const PencilFill = makeIcon(faPen);
export const People = makeIcon(faPeopleGroup);
export const PersonFillAdd = makeIcon(faPersonCirclePlus);
export const PersonFillDash = makeIcon(faPersonCircleMinus);
export const PlayFill = makeIcon(faPlay);
export const TrophyFill = makeIcon(faTrophy);
export const XCircle = makeIcon(faXmark);
