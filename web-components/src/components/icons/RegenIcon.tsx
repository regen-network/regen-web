import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  color?: string;
  className?: string;
}

export default function RegenIcon({ color, className }: Props): JSX.Element {
  color = color ? color : '#000';
  return (
    <SvgIcon viewBox="0 0 361 161" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M208.41 59.3979H214.229C216.057 59.3979 217.377 59.0764 218.21 58.4282C219.037 57.7852 219.459 56.7523 219.459 55.3294C219.459 53.9381 219.037 52.921 218.21 52.2727C217.377 51.6245 216.057 51.303 214.229 51.303H208.41V59.3979ZM213.532 65.3162H208.41V77H200V45H215.679C219.654 45 222.715 45.8748 224.857 47.6192C226.993 49.3636 228.064 51.8827 228.064 55.1818C228.064 57.5112 227.518 59.4453 226.42 61C225.327 62.5494 223.737 63.6983 221.644 64.4414L230 77H220.546L213.532 65.3162Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M260 70.5494V77H234V45H259.357V51.4453H242.486V57.9433H255.904V64.004H242.486V70.5494H260Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M293 59.6522V77.5H287.203L286.961 73.5978C285.123 76.5326 282.078 78 277.829 78C274.931 78 272.363 77.3424 270.126 76.0272C267.884 74.712 266.14 72.7772 264.885 70.2283C263.625 67.6793 263 64.6196 263 61.0489C263 57.5163 263.641 54.4728 264.927 51.9293C266.219 49.375 268.057 47.4185 270.436 46.0543C272.82 44.6848 275.634 44 278.89 44C282.529 44 285.459 44.6685 287.686 46C289.907 47.3315 291.661 49.4837 292.947 52.4511L285.265 55.5978C284.882 53.9674 284.157 52.75 283.091 51.9511C282.036 51.1522 280.712 50.75 279.132 50.75C276.685 50.75 274.81 51.6196 273.502 53.3533C272.2 55.087 271.549 57.6359 271.549 61C271.549 67.9348 274.159 71.4022 279.373 71.4022C281.337 71.4022 282.928 70.9348 284.136 70C285.339 69.0652 285.942 67.7174 285.942 65.9511V65.4511H278.024V59.6522H293Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M325 70.5494V77H299V45H324.362V51.4453H307.484V57.9433H320.903V64.004H307.484V70.5494H325Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M360 77H350.688L340.698 59.693L338.262 54.8393H338.214L338.41 60.8577V77H331V45H340.312L350.302 62.307L352.738 67.1555H352.791L352.595 61.1476V45H360V77Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M218 116H214.561L204.963 101.267L202.529 96.9333H202.503L202.636 100.467V116H200V94H203.439L212.995 108.667L215.465 113.067H215.503L215.364 109.533V94H218V116Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240 113.503V116H223V94H239.464V96.5026H225.846V103.6H236.448V106.103H225.846V113.503H240Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M260 96.4974H252.338V116H249.667V96.4974H242V94H260V96.4974Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M271.926 116H268.577L262 94H264.902L270.275 113.897L275.533 94H278.607L283.871 113.969L289.264 94H292L285.449 116H282.116L278.165 101.733L277.013 96.7692H276.987L275.84 101.733L271.926 116Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M299.154 98.1367C297.728 99.7982 297.014 102.084 297.014 105C297.014 107.921 297.728 110.207 299.154 111.863C300.581 113.525 302.533 114.356 305 114.356C307.472 114.356 309.413 113.525 310.84 111.863C312.267 110.207 312.98 107.921 312.98 105C312.98 102.084 312.267 99.7982 310.84 98.1367C309.413 96.4751 307.472 95.6498 305 95.6498C302.533 95.6498 300.581 96.4751 299.154 98.1367ZM310.818 94.4661C312.477 95.4434 313.755 96.8281 314.656 98.6308C315.552 100.428 316 102.551 316 105C316 107.449 315.552 109.572 314.656 111.375C313.755 113.172 312.477 114.562 310.818 115.539C309.17 116.511 307.229 117 305 117C302.771 117 300.83 116.511 299.176 115.539C297.523 114.562 296.251 113.172 295.349 111.375C294.448 109.572 294 107.449 294 105C294 102.551 294.448 100.428 295.349 98.6308C296.251 96.8281 297.523 95.4434 299.176 94.4661C300.83 93.4887 302.771 93 305 93C307.229 93 309.17 93.4887 310.818 94.4661Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M322.812 104.364H328.738C332.014 104.364 333.65 103.056 333.65 100.431C333.65 97.8103 332.014 96.4974 328.738 96.4974H322.812V104.364ZM328.35 106.867H322.812V116H320V94H328.776C331.135 94 333.029 94.5744 334.454 95.7282C335.884 96.8872 336.597 98.4564 336.597 100.431C336.597 101.99 336.138 103.297 335.231 104.364C334.314 105.431 333.061 106.164 331.475 106.564L338 116H334.664L328.35 106.867Z"
        fill={color}
      />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="343" y="93" width="18" height="24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M343.033 93.1647H360.601V116.205H343.033V93.1647Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M349.72 104.615L345.732 108.804V116.205H343.033V93.1647H345.732V105.034L356.959 93.1647H360.5L351.613 102.558L360.604 116.205H357.364L349.72 104.615Z"
          fill={color}
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.1526 0.676737L67.0116 3.1776L67.0225 11.3135L59.1744 13.8358L54.302 7.26164L59.1526 0.676737Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67.0138 3.17653L76.4097 52.7377L67.0247 11.3124L67.0138 3.17653Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.3042 7.26164L59.1765 13.8358L76.4097 52.7388L54.3042 7.26164Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.1744 13.8363L67.0225 11.314L76.4075 52.7393L59.1744 13.8363Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.875 63.3916L146.919 28.7122L142.069 35.2971L109.875 63.3916Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146.919 28.7101L154.778 31.2109L154.789 39.3468L146.935 41.8745L142.068 35.3003L146.919 28.7101Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.5225 31.9698L85.5174 28.8517L89.763 31.637L88.395 36.467L83.2937 36.6763L81.5225 31.9698Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.7619 31.6344L85.5217 51.1637L81.5214 31.9671L83.2927 36.6737L88.3939 36.4697L89.7619 31.6344Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.875 63.3916L142.069 35.2971L146.936 41.8713L109.875 63.3916Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.117 35.9239L111.191 35.3658L113.284 39.9382L109.523 43.3192L105.098 40.8398L106.117 35.9239Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.117 35.9239L105.098 40.8398L109.523 43.3192L113.284 39.9382L100.122 54.8736L106.117 35.9239Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146.934 41.8723L154.788 39.35L109.874 63.3927L146.934 41.8723Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.3167 44.0818L53.3526 43.2875L55.6743 47.7526L52.0718 51.3107L47.5264 49.0406L48.3167 44.0818Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.3515 43.2849L64.3607 59.8303L47.5308 49.0379L52.0762 51.308L55.6732 47.7553L53.3515 43.2849Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94978 74.2875L55.6193 80.69L12.8088 76.7884L4.94978 74.2875Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94978 74.2875L12.8088 76.7884L12.8197 84.9243L4.96613 87.4466L0.0991974 80.8724L4.94978 74.2875Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.811 76.7873L55.616 80.6889L12.8219 84.9232L12.811 76.7873Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115.511 80.5998L135.159 76.7144L130.319 78.2707L130.325 83.2939L135.175 84.8341L115.511 80.5998Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.318 78.2734L135.163 76.717L138.161 80.7689L135.18 84.8368L130.324 83.2966L130.318 78.2734Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8219 84.9237L55.6215 80.6894L4.96831 87.4461L12.8219 84.9237Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.9265 91.6294L56.9829 89.6008L39.4881 99.352L43.6084 96.395L42.0224 91.624L36.9265 91.6294Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.9266 91.6294L42.0224 91.624L43.6084 96.395L39.4881 99.352L35.3624 96.4057L36.9266 91.6294Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.659 105.562L61.331 97.5445L47.297 112.281L50.4199 108.315L47.5531 104.167L42.659 105.562Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.928 98.0313L154.919 121.961L147.054 119.455L109.928 98.0313Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.928 98.0313L147.054 119.455L142.209 126.045L109.928 98.0313Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.928 98.0313L142.209 126.045L147.071 132.625L109.928 98.0313Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.659 105.562L47.5531 104.167L50.4199 108.315L47.297 112.281L42.5009 110.58L42.659 105.562Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.9575 117.436L67.8962 104.341L59.4267 122.475L61.198 117.768L57.1976 114.65L52.9575 117.436Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.4931 108.783L67.3261 158.371L67.3152 150.235L76.4931 108.783Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.4931 108.783L67.3152 150.235L59.4561 147.734L76.4931 108.783Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.4931 108.783L59.4561 147.734L54.6056 154.319L76.4931 108.783Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.2011 108.754L105.327 125.659L102.335 121.602L97.4792 123.163L97.4901 128.181L95.2011 108.754Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.61 110.13L89.8666 129.482L88.2806 124.711L83.1902 124.722L81.6206 129.493L85.61 110.13Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.9575 117.436L57.1976 114.65L61.198 117.768L59.4267 122.475L54.3309 122.271L52.9575 117.436Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M147.057 119.456L154.916 121.962L154.927 130.093L147.073 132.626L142.206 126.046L147.057 119.456Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.4792 123.161L102.335 121.6L105.327 125.657L102.346 129.725L97.4901 128.179L97.4792 123.161Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M83.1886 124.72L88.2844 124.715L89.8704 129.48L85.7501 132.438L81.6189 129.497L83.1886 124.72Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.4561 147.736L67.3152 150.237L67.3261 158.372L59.4779 160.9L54.6056 154.321L59.4561 147.736Z"
        fill={color}
      />
    </SvgIcon>
  );
}
