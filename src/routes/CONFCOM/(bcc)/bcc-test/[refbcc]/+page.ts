import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    switch(params.refbcc) {
        case "loaded":
        case "active":
            return {
                refbcc: params.refbcc
            }

        default:
            error(404, `Simulateur pour ${ params.refbcc } BCC, non trouvé.`);
    }
}