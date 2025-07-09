import ExtraPages from "@/components/ExtraPages";
import MiniBanner from "@/components/MiniBanner";
import { getExtraPageContent } from "@/lib/api/extraPages";

export default async function privacyPolicyPage() {
    const content = await getExtraPageContent("privacy");
    return (<>
        <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"Privacy Policy"} />
        <ExtraPages content={content} />

    </>)
}