import OAuthSuccessComponent from "@/app/components-local/ui/oauth-success";
import { Suspense } from "react";

const OAuthSuccessPage = () => {
    return (
        <Suspense fallback={<div className="font-lora">Memproses...</div>}>
            <OAuthSuccessComponent />
        </Suspense>
    );
}

export default OAuthSuccessPage