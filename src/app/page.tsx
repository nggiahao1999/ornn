import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="border-[#dad9d6] dark:border-neutral-700 mx-auto max-w-7xl px-4 xl:border-r xl:border-l xl:px-16 py-8 sm:pt-20">
        <div className="relative grid grid-cols-12 mt-8 sm:mt-20">
          <div className="dummy-marker absolute -left-3.5 -translate-x-px md:top-1 lg:top-3 xl:-left-16">
            <div className="bg-red-500 h-12 w-0.75 translate-y-0"></div>
          </div>

          <h2 className="col-span-12 mb-8 text-[40px] leading-12 tracking-tight md:text-5xl md:leading-tight lg:text-6xl">
            Forge Your Next Startup,
            <span className="text-red-500 block">Launch with one click.</span>
          </h2>

          <p className="col-span-12 col-start-1 mb-12 text-lg leading-normal md:col-span-10 md:text-lg lg:col-span-6">
            Ornn is a high-performance Next.js starter kit designed for indie
            hackers and developers who want to forge scalable SaaS products
            fast.
          </p>

          <div className="col-span-12 col-start-1 mb-8 space-x-5">
            <a
              href="/"
              className="bg-neutral-900 shadow-primary-button hover:shadow-primary-button-hover inline-block rounded-xs border border-transparent px-4 py-2 font-medium whitespace-nowrap text-white transition duration-100 hover:bg-black dark:hover:bg-neutral-800"
            >
              Deploy to Vercel
            </a>
          </div>
        </div>
        <div className="relative grid grid-cols-12 mt-8 sm:mt-20">
          <div className="dummy-marker absolute -left-3.5 -translate-x-px md:top-1 lg:top-3 xl:-left-16">
            <div className="bg-red-500 h-12 w-0.75 translate-y-0"></div>
          </div>
          <div className="col-span-12 col-start-1 md:col-span-8 mb-12">
            <h3 className="mb-8 text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-pretty">
              Trusted by developers, startups, and enterprises
            </h3>
            <p className="text-base leading-normal text-balance">
              Ornn is a high-performance Next.js starter kit designed for indie
              hackers and developers who want to forge scalable SaaS products
              fast.
            </p>
          </div>

          <div className="col-span-12 not-motion-reduce:duration-1000 not-motion-reduce:ease-out not-motion-reduce:transition-all relative -mx-4 px-4 xl:-mx-16 xl:px-16">
            <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-x-10">
              <figure className="flex flex-col min-h-90 p-5 border rounded-xs shadow-community-lg text-sand-dark-12 bg-sand-dark-1 border-sand-light-6/10 row-span-2">
                <div className="mb-8 text-sand-dark-10">
                  <svg
                    className="w-auto max-h-8"
                    width="144"
                    height="18"
                    viewBox="0 0 144 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_157_23382)">
                      <g clipPath="url(#clip1_157_23382)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.8163 0C10.865 0 8.39613 1.96374 7.40787 5.89123C8.88968 3.92748 10.6183 3.19123 12.5936 3.68187C13.7206 3.96174 14.5266 4.77465 15.4179 5.67465C16.8706 7.14019 18.5522 8.83626 22.2242 8.83626C26.1749 8.83626 28.6444 6.87252 29.6321 2.94561C28.1508 4.90936 26.4223 5.64561 24.4469 5.15439C23.3193 4.87452 22.5134 4.06161 21.6221 3.16219C20.1693 1.69548 18.4883 0 14.8163 0ZM7.40787 8.83626C3.45716 8.83626 0.987677 10.8 0 14.7275C1.48181 12.7637 3.21039 12.0275 5.18516 12.5181C6.31277 12.798 7.11871 13.6109 8.01 14.5109C9.46277 15.9765 11.1437 17.6725 14.8163 17.6725C18.767 17.6725 21.2365 15.7094 22.2242 11.7819C20.7424 13.7456 19.0138 14.4819 17.0385 13.9912C15.9114 13.7108 15.1055 12.8979 14.2142 11.9985C12.7614 10.5329 11.0799 8.83626 7.40787 8.83626Z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M44.4439 7.44666H41.8583V12.421C41.8583 13.7478 42.7339 13.7269 44.4439 13.6439V15.6547C40.9821 16.0692 39.6059 15.1158 39.6059 12.421V7.44666H37.6875V5.29072H39.6059V2.50711L41.8583 1.84343V5.29072H44.4439V7.44666ZM54.2998 5.29072H56.5515V15.6547H54.2998V14.1624C53.5072 15.2604 52.2768 15.9241 50.6504 15.9241C47.8145 15.9241 45.4583 13.5405 45.4583 10.4724C45.4583 7.38453 47.8145 5.0213 50.6504 5.0213C52.2768 5.0213 53.5072 5.6844 54.2998 6.76266V5.29072ZM51.0052 13.789C52.8818 13.789 54.2998 12.4001 54.2998 10.4724C54.2998 8.54465 52.8818 7.15633 51.0052 7.15633C49.1285 7.15633 47.7106 8.54524 47.7106 10.4724C47.7106 12.4001 49.1285 13.789 51.0052 13.789ZM60.3048 3.73633C59.5128 3.73633 58.8665 3.07324 58.8665 2.3062C58.8684 1.92607 59.0208 1.56215 59.2903 1.29411C59.5599 1.02608 59.9246 0.875762 60.3048 0.876074C60.685 0.875608 61.05 1.02586 61.3196 1.29391C61.5893 1.56196 61.7418 1.92597 61.7436 2.3062C61.7436 3.07265 61.0974 3.73633 60.3048 3.73633ZM59.1789 15.6547V5.29072H61.4312V15.6547H59.1789ZM64.0378 15.6547V0.522461H66.2895V15.6541H64.0378V15.6547ZM80.9072 5.29072H83.2844L80.0107 15.6547H77.8002L75.6315 8.66949L73.4419 15.6547H71.2319L67.9577 5.29072H70.3349L72.3578 12.4414L74.5474 5.29072H76.6952L78.8634 12.4414L80.9072 5.29072ZM86.0785 3.73633C85.2859 3.73633 84.6396 3.07324 84.6396 2.3062C84.6415 1.92597 84.7939 1.56196 85.0636 1.29391C85.3333 1.02586 85.6982 0.875608 86.0785 0.876074C86.4587 0.875608 86.8236 1.02586 87.0933 1.29391C87.363 1.56196 87.5155 1.92597 87.5173 2.3062C87.5173 3.07265 86.871 3.73633 86.0785 3.73633ZM84.9526 15.6547V5.29072H87.2043V15.6547H84.9526ZM95.295 5.0213C97.6304 5.0213 99.2986 6.59659 99.2986 9.29137V15.6541H97.0469V9.51898C97.0469 7.94369 96.1294 7.11511 94.7115 7.11511C93.2309 7.11511 92.0632 7.98549 92.0632 10.0996V15.6547H89.8108V5.29072H92.0632V6.61749C92.7512 5.53982 93.8771 5.0213 95.295 5.0213ZM109.975 1.14549H112.227V15.6541H109.975V14.1618C109.183 15.2604 107.953 15.9235 106.326 15.9235C103.49 15.9235 101.134 13.5399 101.134 10.4718C101.134 7.38395 103.49 5.02072 106.326 5.02072C107.953 5.02072 109.183 5.68382 109.975 6.76207V1.14549ZM106.68 13.789C108.557 13.789 109.975 12.4001 109.975 10.4724C109.975 8.54465 108.557 7.15633 106.68 7.15633C104.804 7.15633 103.386 8.54524 103.386 10.4724C103.386 12.4001 104.804 13.789 106.68 13.789ZM119.776 15.9241C116.627 15.9241 114.271 13.5405 114.271 10.4724C114.271 7.38453 116.627 5.0213 119.776 5.0213C121.819 5.0213 123.592 6.07807 124.425 7.69517L122.486 8.81466C122.027 7.84033 121.006 7.21846 119.755 7.21846C117.92 7.21846 116.523 8.60736 116.523 10.4724C116.523 12.338 117.92 13.7269 119.755 13.7269C121.006 13.7269 122.027 13.0841 122.528 12.1307L124.467 13.2293C123.592 14.8667 121.819 15.9241 119.776 15.9241ZM128.179 8.15098C128.179 10.0375 133.788 8.89711 133.788 12.7323C133.788 14.8052 131.974 15.9241 129.722 15.9241C127.637 15.9241 126.135 14.991 125.468 13.4987L127.408 12.3798C127.741 13.3123 128.575 13.8721 129.722 13.8721C130.723 13.8721 131.494 13.5405 131.494 12.7108C131.494 10.8667 125.885 11.9031 125.885 8.19278C125.885 6.24414 127.574 5.0213 129.701 5.0213C131.411 5.0213 132.829 5.80924 133.559 7.17724L131.661 8.23401C131.286 7.42575 130.556 7.0524 129.701 7.0524C128.888 7.0524 128.179 7.40485 128.179 8.15098ZM137.792 8.15098C137.792 10.0375 143.401 8.89711 143.401 12.7323C143.401 14.8052 141.587 15.9241 139.335 15.9241C137.25 15.9241 135.749 14.991 135.081 13.4987L137.02 12.3798C137.354 13.3123 138.188 13.8721 139.335 13.8721C140.336 13.8721 141.107 13.5405 141.107 12.7108C141.107 10.8667 135.498 11.9031 135.498 8.19278C135.498 6.24414 137.187 5.0213 139.314 5.0213C141.024 5.0213 142.442 5.80924 143.172 7.17724L141.274 8.23401C140.899 7.42575 140.169 7.0524 139.314 7.0524C138.501 7.0524 137.792 7.40485 137.792 8.15098Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_157_23382">
                        <rect
                          width="144"
                          height="18"
                          rx="2"
                          fill="white"
                        ></rect>
                      </clipPath>
                      <clipPath id="clip1_157_23382">
                        <rect width="144" height="18" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <blockquote className="grow -indent-[.6rem] text-xl lg:text-2xl leading-normal text-pretty">
                  “I've been using Ornn for nearly a decade and have never been
                  tempted to switch to anything else.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text[13px] lg:text-sm">
                    <span className="font-medium text-sand-dark-11">
                      Adam Wathan
                    </span>
                    <span className="block text-sand-dark-11">
                      Founder, Tailwind
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/shadcn.png"
                      alt="Adam Wathan"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col h-45 p-5 border rounded-xs shadow-community">
                <blockquote className="grow -indent-[.45rem] text-pretty">
                  “Ornn is our sourdough starter and multitool for web projects
                  large and small. 10 years in, it remains fresh and useful.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Ian Callahan</span>
                    <span className="block text-sand-light-10">
                      Harvard Art Museums
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Ian Callahan"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col h-45 p-5 border rounded-xs shadow-community">
                <blockquote className="grow -indent-[.45rem] text-pretty">
                  “Ornn takes the pain out of building modern, scalable web
                  apps.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Aaron Francis</span>
                    <span className="block text-sand-light-10">
                      Co-founder, Try Hard Studios
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Aaron Francis"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col h-45 p-5 border rounded-xs shadow-community">
                <blockquote className="grow -indent-[.45rem] text-pretty">
                  “Ornn's elegance, performance, and developer experience are
                  unmatched.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Chandresh Patel</span>
                    <span className="block text-sand-light-10">
                      CEO, Bacancy
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Chandresh Patel"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col min-h-90 p-5 border rounded-xs shadow-community-lg row-span-2">
                <div className="mb-8 text-sand-dark-10">
                  <svg
                    className="w-auto max-h-8"
                    width="117"
                    height="40"
                    viewBox="0 0 117 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3472_2853)">
                      <path
                        fill="currentColor"
                        d="M15.7826 17.2248L24.5735 21.2299L33.4322 13.4573C33.568 12.8124 33.6189 12.1845 33.6189 11.5056C33.6189 6.04106 29.1725 1.59473 23.708 1.59473C20.4326 1.59473 17.3949 3.20695 15.5451 5.90529L14.0686 13.5591L15.7826 17.2248Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M6.68643 26.5253C6.55067 27.1702 6.49976 27.832 6.49976 28.5109C6.49976 33.9924 10.9631 38.4387 16.4446 38.4387C19.7369 38.4387 22.8086 36.8095 24.6584 34.0942L26.1179 26.4744L24.1663 22.7408L15.3415 18.7188L6.68643 26.5253Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M6.63518 11.3195L12.6598 12.745L13.9835 5.90581C13.1689 5.27789 12.1507 4.93848 11.0985 4.93848C8.48499 4.93848 6.34668 7.05982 6.34668 9.69028C6.34668 10.2503 6.4485 10.8103 6.63518 11.3195Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M6.11005 12.7617C3.42867 13.6442 1.54492 16.2237 1.54492 19.0579C1.54492 21.8241 3.25896 24.2848 5.82155 25.2691L14.273 17.6323L12.7286 14.323L6.11005 12.7617Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M26.186 34.0937C27.0176 34.7216 28.0189 35.078 29.0541 35.078C31.6676 35.078 33.8059 32.9567 33.8059 30.3262C33.8059 29.7492 33.7041 29.1892 33.5174 28.6801L27.5098 27.2715L26.186 34.0937Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M27.4074 25.6936L34.026 27.2379C36.7243 26.3554 38.5911 23.7759 38.5911 20.9248C38.5911 18.1755 36.8771 15.6978 34.3145 14.7305L25.6594 22.3164L27.4074 25.6936Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M56.1395 28.0863L56.9371 28.0014L56.988 29.6306C54.8836 29.9191 53.0847 30.0718 51.5913 30.0718C49.6057 30.0718 48.1971 29.4948 47.3656 28.3408C46.534 27.1868 46.1267 25.3879 46.1267 22.9611C46.1267 18.1075 48.0614 15.6807 51.9137 15.6807C53.7805 15.6807 55.1721 16.2068 56.0885 17.242C57.005 18.2772 57.4632 19.9233 57.4632 22.1465L57.3444 23.7248H48.2141C48.2141 25.2521 48.4856 26.3892 49.0457 27.1189C49.6057 27.8487 50.5561 28.222 51.9307 28.222C53.3223 28.256 54.7139 28.2051 56.1395 28.0863ZM55.3927 22.0956C55.3927 20.3985 55.1212 19.1936 54.5781 18.4978C54.0351 17.802 53.1526 17.4456 51.9307 17.4456C50.7088 17.4456 49.7754 17.819 49.1645 18.5487C48.5535 19.2785 48.2311 20.4664 48.2141 22.0956H55.3927Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M60.3481 29.8177V9.96191H62.4186V29.8177H60.3481Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M75.5031 20.1615V26.9668C75.5031 27.6626 77.2171 27.7984 77.2171 27.7984L77.1153 29.6312C75.6558 29.6312 74.4509 29.75 73.7212 29.0542C72.058 29.7839 70.4119 30.0894 68.7487 30.0894C67.4759 30.0894 66.5086 29.733 65.8467 29.0033C65.1849 28.2905 64.8455 27.2553 64.8455 25.8977C64.8455 24.557 65.1849 23.5557 65.8637 22.9278C66.5425 22.2999 67.6117 21.8926 69.0712 21.7568L73.4157 21.3495V20.1615C73.4157 19.2282 73.212 18.5493 72.8047 18.142C72.3974 17.7347 71.8374 17.5311 71.1416 17.5311H65.694V15.6982H71.0058C72.5671 15.6982 73.7042 16.0546 74.417 16.7844C75.1467 17.4971 75.5031 18.6342 75.5031 20.1615ZM66.9838 25.7958C66.9838 27.4929 67.6796 28.3414 69.0881 28.3414C70.344 28.3414 71.5828 28.1378 72.7878 27.7135L73.4157 27.4929V22.9278L69.3257 23.3181C68.4942 23.386 67.9002 23.6236 67.5268 24.0309C67.1535 24.4382 66.9838 25.0321 66.9838 25.7958Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M83.5981 17.5477C81.5955 17.5477 80.5773 18.2435 80.5773 19.6521C80.5773 20.2969 80.8149 20.7552 81.2731 21.0267C81.7313 21.2982 82.7835 21.5697 84.4297 21.8582C86.0758 22.1467 87.2298 22.5371 87.9087 23.0632C88.5875 23.5723 88.9269 24.5396 88.9269 25.9652C88.9269 27.3907 88.4687 28.4259 87.5523 29.0878C86.6359 29.7496 85.3121 30.089 83.5472 30.089C82.4101 30.089 78.5917 29.6648 78.5917 29.6648L78.7105 27.8659C80.8997 28.0695 82.495 28.2392 83.5641 28.2392C84.6333 28.2392 85.4479 28.0695 86.0079 27.7301C86.568 27.3907 86.8565 26.8137 86.8565 26.0161C86.8565 25.2184 86.6189 24.6754 86.1437 24.3869C85.6685 24.0984 84.6163 23.8269 82.9871 23.5723C81.3579 23.3177 80.2039 22.9444 79.5251 22.4353C78.8463 21.9431 78.5068 21.0097 78.5068 19.669C78.5068 18.3283 78.982 17.3271 79.9324 16.6822C80.8827 16.0373 82.0707 15.7148 83.4793 15.7148C84.5994 15.7148 88.5026 16.0033 88.5026 16.0033V17.8192C86.4492 17.7004 84.7691 17.5477 83.5981 17.5477Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M98.9392 17.7857H94.5438V24.4043C94.5438 25.9826 94.6626 27.0348 94.8832 27.5269C95.1208 28.0191 95.6639 28.2736 96.5294 28.2736L98.9901 28.1039L99.1259 29.818C97.887 30.0216 96.9536 30.1234 96.3087 30.1234C94.8662 30.1234 93.8819 29.767 93.3219 29.0712C92.7619 28.3754 92.4903 27.0348 92.4903 25.0662V17.7857H90.5217V15.9868H92.4903V11.7441H94.5438V15.9699H98.9392V17.7857Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M101.824 12.847V10.4541H103.895V12.8639L101.824 12.847ZM101.824 29.8177V15.9866H103.895V29.8177H101.824Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M112.889 15.6982C113.5 15.6982 114.535 15.817 115.995 16.0377L116.656 16.1225L116.572 17.8026C115.095 17.6329 114.009 17.5481 113.313 17.5481C111.752 17.5481 110.683 17.9214 110.123 18.6681C109.563 19.4148 109.274 20.8064 109.274 22.8259C109.274 24.8455 109.529 26.254 110.055 27.0517C110.581 27.8493 111.667 28.2396 113.33 28.2396L116.589 27.9851L116.673 29.6991C114.959 29.9537 113.67 30.0894 112.821 30.0894C110.666 30.0894 109.172 29.5294 108.358 28.4263C107.543 27.3232 107.119 25.4564 107.119 22.8259C107.119 20.1955 107.56 18.3457 108.443 17.2935C109.342 16.2413 110.819 15.6982 112.889 15.6982Z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_3472_2853">
                        <rect
                          width="116.674"
                          height="40"
                          fill="currentColor"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <blockquote className="grow -indent-[.6rem] text-xl lg:text-2xl leading-normal text-pretty">
                  “Shipping apps with Ornn means balancing performance,
                  flexibility, and simplicity—while ensuring a great developer
                  experience.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text[13px] lg:text-sm">
                    <span className="font-medium text-sand-dark-11">
                      Peter Steenbergen
                    </span>
                    <span className="block text-sand-dark-11">Elastic</span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Peter Steenbergen"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col h-45 p-5 border rounded-xs shadow-community">
                <blockquote className="grow -indent-[.45rem] text-pretty">
                  “Ornn is a breath of fresh air in the Typescript ecosystem,
                  with a brilliant community around it.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Erika Heidi</span>
                    <span className="block text-sand-light-10">
                      Creator, Minicli
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Erika Heidi"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col h-45 p-5 border rounded-xs shadow-community">
                <blockquote className="grow -indent-[.45rem] text-pretty">
                  “The framework, the ecosystem and the community - it's the
                  perfect package.”
                </blockquote>
                <figcaption className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Zuzana Kunckova</span>
                    <span className="block text-sand-light-10">
                      Founder, Larabelles
                    </span>
                  </div>
                  <div className="w-12 h-12">
                    <img
                      src="https://github.com/maxleiter.png"
                      alt="Zuzana Kunckova"
                      loading="lazy"
                      className="w-full h-full rounded-xs"
                    />
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto w-full max-w-full px-4 pt-10 md:pt-16 xl:px-16 pb-2 xl:max-w-7xl">
          <p className="text-right">A project by Nguyen Gia Hao</p>
        </div>
      </footer>
    </>
  );
}
