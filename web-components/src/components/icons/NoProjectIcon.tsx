import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const NoProjectIcon: React.FC<React.PropsWithChildren<SvgIconProps>> =
  props => {
    return (
      <SvgIcon
        {...props}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 27.664V19H82V27.664L17 27.664ZM13 30.9859V27.914V18C13 16.3431 14.3431 15 16 15H83C84.6569 15 86 16.3431 86 18V27.914V30.9859V45.4222C84.7613 44.2266 83.4184 43.1952 82 42.3282V31.2359L17 31.2359V68.4752H47.736C48.199 69.8503 48.8013 71.1906 49.5431 72.4752H16C14.3431 72.4752 13 71.132 13 69.4752V30.9859ZM47.55 54.9699C46.8091 57.389 46.4939 59.9055 46.6044 62.4074C46.5864 62.4084 46.5682 62.4089 46.55 62.4089H43.7156C43.5443 62.4428 43.3671 62.4606 43.1858 62.4606H26.3645C26.1832 62.4606 26.006 62.4428 25.8347 62.4089H23C22.4477 62.4089 22 61.9612 22 61.4089V38.4056C22 37.8533 22.4477 37.4056 23 37.4056H46.55C47.1023 37.4056 47.55 37.8533 47.55 38.4056V54.9699ZM53.6707 45.1988C53.5661 45.297 53.4622 45.3964 53.359 45.4969C53.2888 45.5654 53.2191 45.6341 53.1499 45.7032V45.4488C53.1499 45.3107 53.2618 45.1988 53.3999 45.1988H53.6707ZM75.0499 39.4994C69.8012 38.2937 64.204 38.8946 59.3026 41.3022H53.3999C53.2618 41.3022 53.1499 41.1903 53.1499 41.0522V37.6556C53.1499 37.5175 53.2618 37.4056 53.3999 37.4056L74.7999 37.4056C74.938 37.4056 75.0499 37.5175 75.0499 37.6556V39.4994ZM26.0972 60.4089H43.4531C43.7152 60.3031 43.9001 60.0462 43.9001 59.7462C43.9001 58.168 42.6208 56.8887 41.0426 56.8887H28.5077C26.9295 56.8887 25.6501 58.168 25.6501 59.7462C25.6501 60.0462 25.8351 60.3031 26.0972 60.4089ZM45.55 39.4056V57.9319C44.8312 56.1479 43.084 54.8887 41.0426 54.8887H40.25V48.2821C40.25 48.2015 40.2112 48.1259 40.1458 48.0789L34.9208 44.3293C34.8337 44.2667 34.7164 44.2667 34.6293 44.3293L29.4043 48.0789C29.3389 48.1259 29.3 48.2015 29.3 48.2821V54.8887H28.5077C26.466 54.8887 24.7186 56.1482 24 57.9326V39.4056H45.55ZM38.25 49.1802L34.775 46.6864L31.3 49.1802V54.7263H38.25V49.1802ZM21 25C22.1046 25 23 24.1046 23 23C23 21.8954 22.1046 21 21 21C19.8954 21 19 21.8954 19 23C19 24.1046 19.8954 25 21 25ZM29 23C29 24.1046 28.1046 25 27 25C25.8954 25 25 24.1046 25 23C25 21.8954 25.8954 21 27 21C28.1046 21 29 21.8954 29 23ZM33 25C34.1046 25 35 24.1046 35 23C35 21.8954 34.1046 21 33 21C31.8954 21 31 21.8954 31 23C31 24.1046 31.8954 25 33 25Z"
          fill="#8F8F8F"
        />
        <mask id="path-2-inside-1_5968_16194" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.5749 51.0833L59.2712 69.888C54.7291 64.6448 54.9935 56.7958 60.0644 51.856C65.1353 46.9161 73.1925 46.6586 78.5749 51.0833ZM81.2314 54.006L62.2714 72.476C67.5832 75.8548 74.7738 75.2724 79.4379 70.7288C84.102 66.1852 84.6998 59.1805 81.2314 54.006ZM82.3031 49.0648C88.8079 55.4015 89.209 65.4325 83.5065 72.2247C83.5862 72.2821 83.6626 72.3459 83.7348 72.4163L94.8046 83.1998C95.5856 83.9607 95.5856 85.1943 94.8046 85.9552C94.0235 86.716 92.7572 86.716 91.9761 85.9552L80.9063 75.1716C80.8241 75.0915 80.7506 75.0062 80.6857 74.9167C73.7202 80.2356 63.615 79.77 57.1992 73.52C50.2669 66.7669 50.2669 55.8179 57.1992 49.0648C64.1314 42.3117 75.3708 42.3117 82.3031 49.0648Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M78.5749 51.0833L59.2712 69.888C54.7291 64.6448 54.9935 56.7958 60.0644 51.856C65.1353 46.9161 73.1925 46.6586 78.5749 51.0833ZM81.2314 54.006L62.2714 72.476C67.5832 75.8548 74.7738 75.2724 79.4379 70.7288C84.102 66.1852 84.6998 59.1805 81.2314 54.006ZM82.3031 49.0648C88.8079 55.4015 89.209 65.4325 83.5065 72.2247C83.5862 72.2821 83.6626 72.3459 83.7348 72.4163L94.8046 83.1998C95.5856 83.9607 95.5856 85.1943 94.8046 85.9552C94.0235 86.716 92.7572 86.716 91.9761 85.9552L80.9063 75.1716C80.8241 75.0915 80.7506 75.0062 80.6857 74.9167C73.7202 80.2356 63.615 79.77 57.1992 73.52C50.2669 66.7669 50.2669 55.8179 57.1992 49.0648C64.1314 42.3117 75.3708 42.3117 82.3031 49.0648Z"
          fill="#8F8F8F"
        />
        <path
          d="M59.2712 69.888L58.5153 70.5428L59.2095 71.3442L59.9689 70.6044L59.2712 69.888ZM78.5749 51.0833L79.2726 51.7996L80.0728 51.0201L79.2099 50.3108L78.5749 51.0833ZM60.0644 51.856L59.3666 51.1397L60.0644 51.856ZM81.2314 54.006L82.0621 53.4492L81.3936 52.4519L80.5336 53.2897L81.2314 54.006ZM62.2714 72.476L61.5737 71.7597L60.6684 72.6415L61.7347 73.3197L62.2714 72.476ZM79.4379 70.7288L78.7401 70.0125L79.4379 70.7288ZM83.5065 72.2247L82.7406 71.5817L82.0475 72.4073L82.9227 73.0366L83.5065 72.2247ZM82.3031 49.0648L81.6053 49.7811L82.3031 49.0648ZM83.7348 72.4163L83.037 73.1326L83.037 73.1326L83.7348 72.4163ZM94.8046 83.1998L95.5023 82.4835L94.8046 83.1998ZM91.9761 85.9552L92.6739 85.2389L91.9761 85.9552ZM80.9063 75.1716L80.2085 75.8879L80.2085 75.8879L80.9063 75.1716ZM80.6857 74.9167L81.4951 74.3295L80.8933 73.5L80.0788 74.122L80.6857 74.9167ZM57.1992 73.52L56.5014 74.2363L57.1992 73.52ZM57.1992 49.0648L57.897 49.7811L57.1992 49.0648ZM59.9689 70.6044L79.2726 51.7996L77.8771 50.367L58.5734 69.1717L59.9689 70.6044ZM60.027 69.2333C55.8299 64.3883 56.0726 57.1407 60.7622 52.5723L59.3666 51.1397C53.9144 56.4509 53.6283 64.9013 58.5153 70.5428L60.027 69.2333ZM60.7622 52.5723C65.4637 47.9923 72.9465 47.7509 77.9398 51.8557L79.2099 50.3108C73.4385 45.5663 64.8069 45.84 59.3666 51.1397L60.7622 52.5723ZM80.5336 53.2897L61.5737 71.7597L62.9692 73.1923L81.9292 54.7223L80.5336 53.2897ZM78.7401 70.0125C74.4173 74.2236 67.7395 74.769 62.8082 71.6322L61.7347 73.3197C67.4269 76.9405 75.1303 76.3211 80.1357 71.4451L78.7401 70.0125ZM80.4008 54.5628C83.6039 59.3416 83.0542 65.8099 78.7401 70.0125L80.1357 71.4451C85.1498 66.5605 85.7957 59.0194 82.0621 53.4492L80.4008 54.5628ZM84.2723 72.8677C90.3095 65.6768 89.883 55.0528 83.0009 48.3485L81.6053 49.7811C87.7327 55.7502 88.1085 65.1881 82.7406 71.5817L84.2723 72.8677ZM84.4326 71.7C84.3245 71.5947 84.21 71.4989 84.0903 71.4128L82.9227 73.0366C82.9624 73.0652 83.0006 73.0971 83.037 73.1326L84.4326 71.7ZM95.5023 82.4835L84.4326 71.6999L83.037 73.1326L94.1068 83.9162L95.5023 82.4835ZM95.5023 86.6715C96.6863 85.5181 96.6863 83.6369 95.5023 82.4835L94.1068 83.9162C94.4849 84.2845 94.4849 84.8705 94.1068 85.2389L95.5023 86.6715ZM91.2783 86.6715C92.4477 87.8106 94.333 87.8106 95.5023 86.6715L94.1068 85.2389C93.714 85.6215 93.0667 85.6215 92.6739 85.2389L91.2783 86.6715ZM80.2085 75.8879L91.2783 86.6715L92.6739 85.2389L81.6041 74.4553L80.2085 75.8879ZM79.8763 75.504C79.9747 75.6396 80.0855 75.7681 80.2085 75.8879L81.6041 74.4553C81.5627 74.4149 81.5265 74.3728 81.4951 74.3295L79.8763 75.504ZM56.5014 74.2363C63.2784 80.8381 73.9395 81.3263 81.2926 75.7115L80.0788 74.122C73.5009 79.1448 63.9516 78.7018 57.897 72.8037L56.5014 74.2363ZM56.5014 48.3485C49.1662 55.4942 49.1662 67.0906 56.5014 74.2363L57.897 72.8037C51.3677 66.4431 51.3677 56.1417 57.897 49.7811L56.5014 48.3485ZM83.0009 48.3485C75.6803 41.2172 63.822 41.2172 56.5014 48.3485L57.897 49.7811C64.4409 43.4063 75.0614 43.4063 81.6053 49.7811L83.0009 48.3485Z"
          fill="#8F8F8F"
          mask="url(#path-2-inside-1_5968_16194)"
        />
      </SvgIcon>
    );
  };