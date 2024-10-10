import Head from "next/head";
import BowlingAlley from "../components/BowlingAlley";
import { AnimationLayout } from "../components/Transition";

const SpotifyIFrame = ({ src, height, startAt }) => {
    return (
        <div>
            <iframe
                src={src}
                width="80%"
                height={height}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
        </div>
    );
};

const YoutubeIFrame = ({ src }) => {
    return (
        <iframe
            width="80%"
            height="150"
            src={src}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    );
};

export default function MusicPage() {
    const kubla = {
        src: "https://open.spotify.com/embed/artist/7KgcPkeaO1Rpa4MFl2sLOm?utm_source=generator&theme=0",
        height: 400,
    };
    const doohickey = {
        src: "https://open.spotify.com/embed/track/0GdFn9cxQlB0qpEy2AvGlr#2:39?utm_source=generator&theme=0",
        height: 80,
    };
    const ytEmbeds = [
        { src: "https://www.youtube.com/embed/mSYSDZg7fsc?si=QkWCHCVMbBjlrgQZ" },
        { src: "https://www.youtube.com/embed/kOfVGNb2HFM?si=1QO91vm_WiL-Ff_9" },
        { src: "https://www.youtube.com/embed/XBoUt442sLs?si=vrKJTLCshtQFg6Eq" },
        { src: "https://www.youtube.com/embed/UTr-ZZu8Zu8?si=TgOMyb3puofi_ILV" },
    ];
    return (
        <>
            <Head>
                <title>Gaelan McMillan's Music</title>
            </Head>
            <AnimationLayout>
                <BowlingAlley>
                    <div
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                            display: 'flex',
                            gap: "1rem",
                            flexDirection: 'column',
                            marginBottom: '1rem'
                        }}
                    >
                        <div>
                            <h2>My musical credits</h2>
                            As a bassist/composer
                            <SpotifyIFrame src={kubla.src} height={kubla.height} />
                            <i>Kubla</i> is the work of Kiaran, my older brother.
                            <br />I play bass all his songs (except <i>Changes</i>, but that
                            song's great too).
                        </div>
                        <div>
                            Other bass credits
                            <SpotifyIFrame src={doohickey.src} height={doohickey.height} />
                        </div>
                        <div>
                            YouTube links
                            {ytEmbeds.map(({ src }, i) => {
                                return (
                                    <div>
                                        <YoutubeIFrame src={src} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </BowlingAlley>
            </AnimationLayout>
        </>
    );
}
