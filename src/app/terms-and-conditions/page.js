import ExtraPages from "@/components/ExtraPages";
import MiniBanner from "@/components/MiniBanner";
import { getExtraPageContent } from "@/lib/api/extraPages";

export default async function termsConditionPage() {
    const content = await getExtraPageContent("terms");
    return (<>
        <MiniBanner bg_img={"https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"} pageName={"Terms & Conditions"} />
        <ExtraPages content={content} />

    </>)
}