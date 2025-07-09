import ExtraPages from "@/components/ExtraPages";
import { getExtraPageContent } from "@/lib/api/extraPages";

export default async function privacyPolicyPage() {
    const content = await getExtraPageContent("privacy");
    return (<>

        <ExtraPages pageName={"Privacy Policy"} content={content} />

    </>)
}