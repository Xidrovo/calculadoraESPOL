<script>
    import MediaQuery from "./MediaQuery.svelte";
</script>

<style>
    .social-media {
        font-size: 1rem;
    }
    .social-media a,
    .social-media div {
        /* margin-top: 0.25rem; */
        margin-bottom: 0.25rem;
        text-decoration: none;
    }
    .link-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }
    .desc-text {
        font-size: 1.25rem;
    }
    .social {
        justify-content: center;
    }
    .justify-between {
        justify-content: space-between;
    }
    .footer {
        padding-left: 5rem;
        padding-right: 5rem;
        background-color: #004448 !important;
        padding-top: 5rem;
        padding-bottom: 5rem;
        color: white;
    }
</style>

<main>
    <MediaQuery query="(min-width: 1281px)" let:matches>
        <div
            class={`footer flex ${!matches ? 'flex-col' : 'flex-row'} justify-between `}>
            <div class={`${matches ? 'w-half' : 'w-full'} desc-text`}>
                <p>
                    Herramienta para calcular los promedios de la ESPOL. Las
                    notas son colocadas sobre 100 y calculado luego de acuerdo
                    al porcentaje práctico/teórico.
                </p>
                <strong>Nuevo</strong>
                <p>
                    Esta aplicación permite ser instalada en celulares. Esto
                    gracias al poder de las
                    <a
                        href="https://developer.mozilla.org/es/docs/Web/Progressive_web_apps"
                        target="_blank">Progresive Web App (PWA)</a>. Si
                    <strong>NO</strong>
                    aceptaste la instalación puedes borrar caché e intentar de
                    nuevo. ¡Gracias!
                </p>
                <p><strong>Creador:</strong> Xavier Idrovo Vallejo</p>
            </div>
            <div class="flex flex-col social">
                <div class="link-title">Contacto</div>
                <div class="flex flex-col social-media">
                    <a
                        href="https://github.com/Xidrovo"
                        target="_blank">Github</a>
                    <a
                        href="https://www.linkedin.com/in/xavier-idrovo-vallejo-34a4b2119/"
                        target="_blank">LinkedIn</a>
                    <div>Email: Xidrovo@hotmail.com</div>
                </div>
            </div>
        </div>
    </MediaQuery>
</main>
