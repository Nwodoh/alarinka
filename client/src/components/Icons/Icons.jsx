import styles from "./Icons.module.css";

function Icons({ type, iconClasses }) {
  switch (type) {
    case "wifi":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm0-440q75 0 142.5 24T745-470q20 15 20.5 39.5T748-388q-17 17-42 17.5T661-384q-38-26-84-41t-97-15q-51 0-97 15t-84 41q-20 14-45 13t-42-18q-17-18-17-42.5t20-39.5q55-42 122.5-65.5T480-560Zm0-240q125 0 235.5 41T914-643q20 17 21 42t-17 43q-17 17-42 17.5T831-556q-72-59-161.5-91.5T480-680q-100 0-189.5 32.5T129-556q-20 16-45 15.5T42-558q-18-18-17-43t21-42q88-75 198.5-116T480-800Z" />
        </svg>
      );
    case "parking":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M240-200v20q0 25-17.5 42.5T180-120q-25 0-42.5-17.5T120-180v-286q0-7 1-14t3-13l75-213q8-24 29-39t47-15h410q26 0 47 15t29 39l75 213q2 6 3 13t1 14v286q0 25-17.5 42.5T780-120q-25 0-42.5-17.5T720-180v-20H240Zm-8-360h496l-42-120H274l-42 120Zm68 240q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Z" />
        </svg>
      );
    case "tv":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M160-200q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v40q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160v-40H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
        </svg>
      );
    case "pets":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
        </svg>
      );
    case "food":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M280-600v-240q0-17 11.5-28.5T320-880q17 0 28.5 11.5T360-840v240h40v-240q0-17 11.5-28.5T440-880q17 0 28.5 11.5T480-840v240q0 56-34.5 98T360-446v326q0 17-11.5 28.5T320-80q-17 0-28.5-11.5T280-120v-326q-51-14-85.5-56T160-600v-240q0-17 11.5-28.5T200-880q17 0 28.5 11.5T240-840v240h40Zm400 200h-80q-17 0-28.5-11.5T560-440v-240q0-70 51.5-135T718-880q18 0 30 14t12 33v713q0 17-11.5 28.5T720-80q-17 0-28.5-11.5T680-120v-280Z" />
        </svg>
      );
    case "entrance":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M440-440q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-120v-80l240-40v-445q0-15-9-27t-23-14l-208-34v-80l220 36q44 8 72 41t28 77v444q0 29-19 51.5T533-163l-253 43Zm0-80h400v-560H280v560Zm-120 80q-17 0-28.5-11.5T120-160q0-17 11.5-28.5T160-200h40v-560q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v560h40q17 0 28.5 11.5T840-160q0 17-11.5 28.5T800-120H160Z" />
        </svg>
      );
    case "location":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 79q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5Zm0-453Zm0 80q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z" />
        </svg>
      );
    case "time":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
        </svg>
      );
    case "person":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </svg>
      );
    case "mail":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z" />
        </svg>
      );
    case "bin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" />
        </svg>
      );
    case "day":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M440-840v-40q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v40q0 17-11.5 28.5T480-800q-17 0-28.5-11.5T440-840Zm0 760v-40q0-17 11.5-28.5T480-160q17 0 28.5 11.5T520-120v40q0 17-11.5 28.5T480-40q-17 0-28.5-11.5T440-80Zm440-360h-40q-17 0-28.5-11.5T800-480q0-17 11.5-28.5T840-520h40q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440Zm-760 0H80q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h40q17 0 28.5 11.5T160-480q0 17-11.5 28.5T120-440Zm670-293-14 14q-11 11-27.5 11T720-720q-11-11-11.5-27.5T719-776l15-15q11-12 28-12t29 12q12 12 11.5 29T790-733ZM241-184l-15 15q-11 12-28 12t-29-12q-12-12-11.5-29t12.5-29l14-14q11-11 27.5-11t28.5 12q11 11 11.5 27.5T241-184Zm492 14-14-14q-11-11-11-27.5t12-28.5q11-11 27.5-11.5T776-241l15 15q12 11 12 28t-12 29q-12 12-29 11.5T733-170ZM184-719l-15-15q-12-11-12-28t12-29q12-12 29-11.5t29 12.5l14 14q11 11 11 27.5T240-720q-11 11-27.5 11.5T184-719Zm296 479q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z" />
        </svg>
      );
    case "night":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M482.31-160q-133.34 0-226.67-93.33-93.33-93.34-93.33-226.67 0-121.54 79.23-210.77t196.15-105.38q3.23 0 6.35.23 3.11.23 6.11.69-20.23 28.23-32.03 62.81-11.81 34.57-11.81 72.42 0 106.67 74.66 181.33Q555.64-404 662.31-404q38.07 0 72.54-11.81 34.46-11.81 61.92-32.04.46 3 .69 6.12.23 3.11.23 6.35-15.38 116.92-104.61 196.15T482.31-160Z" />
        </svg>
      );
    case "group":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M69.23-256.92q-12.42 0-20.83-8.41-8.4-8.4-8.4-20.82v-5.31q0-36.85 39.38-61.16 39.39-24.3 101.39-24.3 9.15 0 19.61.88 10.47.89 22.24 2.89-9.39 16.38-13.7 33.61-4.3 17.23-4.3 34.54v48.08H69.23Zm243.39 0q-14.24 0-23.43-9.29T280-289.23v-12.69q0-24.18 14.04-44.21 14.04-20.02 41.42-34.64 27.39-14.61 63.81-21.92 36.42-7.31 80.42-7.31 44.85 0 81.27 7.31 36.42 7.31 63.81 21.92 27.38 14.62 41.31 34.64Q680-326.1 680-301.92v12.69q0 13.73-9.29 23.02t-23.02 9.29H312.62Zm442.76 0v-47.97q0-19.19-4.19-36.03-4.19-16.85-12.57-32.23 12.53-2 22.5-2.89 9.96-.88 18.88-.88 62 0 101 24.19t39 61.27v5.31q0 12.42-8.4 20.82-8.41 8.41-20.83 8.41H755.38Zm-434.23-40h317.93v-8.46q-2.31-28.47-46.66-46.54Q548.08-370 480-370t-112.42 18.08q-44.35 18.07-46.43 46.54v8.46Zm-140.59-117.7q-23.56 0-40.14-16.72-16.57-16.72-16.57-40.2 0-23.23 16.72-39.69 16.72-16.46 40.2-16.46 23.23 0 40.08 16.46 16.84 16.46 16.84 39.92 0 22.77-16.42 39.73-16.43 16.96-40.71 16.96Zm599.44 0q-23 0-39.96-16.96t-16.96-39.73q0-23.46 16.96-39.92t40.11-16.46q23.85 0 40.31 16.46t16.46 39.69q0 23.48-16.36 40.2-16.37 16.72-40.56 16.72ZM480.27-440q-36.42 0-62.19-25.58-25.77-25.57-25.77-62.11 0-37.27 25.57-62.48 25.58-25.22 62.12-25.22 37.27 0 62.48 25.14 25.21 25.13 25.21 62.29 0 36.42-25.13 62.19Q517.43-440 480.27-440Zm.11-40q19.7 0 33.5-14.19 13.81-14.2 13.81-33.89t-13.71-33.5q-13.71-13.81-33.98-13.81-19.31 0-33.5 13.72-14.19 13.71-14.19 33.98 0 19.3 14.19 33.5Q460.69-480 480.38-480Zm-.15 183.08ZM480-527.69Z" />
        </svg>
      );
    case "search place":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
          className={`${styles.icons} ${iconClasses}`}
        >
          <path d="M84-480q0-82 31.5-154t85-125.5Q254-813 326-844.5T480-876q143 0 250 89.5T863-562q4 12-1 23t-17 13q-11 2-20-5.5T812-550q-15-85-69-152t-135-98v19q0 35-25.5 60.5T522-695h-84v86q0 17-12.5 29.5T396-567h-88v86h18q18 0 30.5 12.5T369-438v85h-18L146-558q-3 20-5.5 39t-2.5 39q0 136 91 234t227 108q11 1 17.5 10t6.5 18q0 11-8.5 18T451-85Q297-96 190.5-209.5T84-480Zm733 335L696-263q-17 14-36.5 19t-39.5 5q-60 0-100.5-40.5T479-380q0-60 40.5-100.5T620-521q60 0 100.5 40.5T761-380q0 21-5.5 41.5T735-301l120 118q10 9 10.5 18.5T856-145q-9 9-19 9t-20-9ZM620-293q36 0 61.5-25.5T707-380q0-36-25.5-61.5T620-467q-36 0-61.5 25.5T533-380q0 36 25.5 61.5T620-293Z" />
        </svg>
      );

    default:
      throw new Error(`No such api exist as ${type}`);
  }
}

export default Icons;
