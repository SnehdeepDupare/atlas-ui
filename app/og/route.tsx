import { ImageResponse } from "next/og";

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    <div
      tw="flex h-full w-full bg-black text-white"
      style={{ fontFamily: "Geist Sans" }}
    >
      <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-px" />
      <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-px" />
      <div tw="flex border absolute border-stone-700 inset-x-0 h-px top-16" />
      <div tw="flex border absolute border-stone-700 inset-x-0 h-px bottom-16" />
      <div tw="flex absolute flex-row bottom-24 right-24 text-white">
        <div tw="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={48}
            zoomAndPan="magnify"
            viewBox="0 0 1500 1499.999933"
            height={48}
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            // @ts-ignore
            tw="rounded-md"
          >
            <defs>
              <clipPath id="e200e7b732">
                <path
                  d="M 150 225 L 1350 225 L 1350 1275 L 150 1275 Z M 150 225 "
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="e45a951695">
                <path
                  d="M 750 225 L 1350 1275 L 150 1275 Z M 750 225 "
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="b3d2d8f73a">
                <path
                  d="M 242 511 L 874 511 L 874 1285 L 242 1285 Z M 242 511 "
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="38a351b358">
                <path
                  d="M 242.53125 689.410156 L 523.398438 511.515625 L 942.425781 1173.09375 L 661.554688 1350.988281 Z M 242.53125 689.410156 "
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="b5d5729204">
                <path
                  d="M 748.953125 1281.75 C 766.761719 1278.011719 785.371094 1271.179688 801.4375 1261.003906 C 817.503906 1250.824219 831.046875 1238.003906 841.882812 1223.59375 C 842.082031 1223.234375 842.382812 1223.042969 842.582031 1222.683594 C 882.441406 1167.253906 885.828125 1085.410156 840.535156 1012.226562 L 523.398438 511.515625 L 242.53125 689.410156 L 559.429688 1189.75 C 606.683594 1262.679688 681.515625 1294.984375 748.953125 1281.75 Z M 748.953125 1281.75 "
                  clip-rule="nonzero"
                />
              </clipPath>
            </defs>
            <rect
              x="-150"
              width="1800"
              fill="#ffffff"
              y="-149.999993"
              height="1799.99992"
              fill-opacity="1"
            />
            <rect
              x="-150"
              width="1800"
              fill="#ffffff"
              y="-149.999993"
              height="1799.99992"
              fill-opacity="1"
            />
            <g clip-path="url(#e200e7b732)">
              <g clip-path="url(#e45a951695)">
                <path
                  fill="#000000"
                  d="M 150 225 L 1351.757812 225 L 1351.757812 1275 L 150 1275 Z M 150 225 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
            </g>
            <g clip-path="url(#b3d2d8f73a)">
              <g clip-path="url(#38a351b358)">
                <g clip-path="url(#b5d5729204)">
                  <path
                    fill="#ffffff"
                    d="M 242.53125 689.410156 L 523.398438 511.515625 L 941.730469 1172 L 660.859375 1349.894531 Z M 242.53125 689.410156 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
              </g>
            </g>
          </svg>

          <div tw="text-white flex text-[32px] font-semibold tracking-tight ml-2">
            Atlas UI
          </div>
        </div>
      </div>
      <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
        <div
          tw="tracking-tight grow flex flex-col justify-center leading-[1.1]"
          style={{
            textWrap: "balance",
            fontWeight: 600,
            fontSize: title && title.length > 20 ? 64 : 80,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </div>
        <div
          tw="text-[40px] leading-normal grow text-stone-400"
          style={{
            fontWeight: 500,
            textWrap: "balance",
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 628,
      fonts,
    }
  );
}
