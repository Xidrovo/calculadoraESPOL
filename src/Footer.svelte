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
                    Esta herramienta te ayuda a calcular el promedio de las
                    calificaciones de tus materias.
                </p>
                <p>
                    Las calificaciones se ingresan sobre 100 y se calcula su
                    promedio de acuerdo al porcentaje práctico/teórico de la
                    materia.
                </p>
                <strong>Nuevo</strong>
                <p>
                    Esta aplicación puede ser instalada en teléfono mobiles
                    gracias al .
                    <a
                        href="https://developer.mozilla.org/es/docs/Web/Progressive_web_apps"
                        rel="noopener noreferrer"
                        target="_blank">Progresive Web App (PWA)</a>. Si
                    <strong>NO</strong>
                    aceptaste la instalación puedes
                    <a
                        href="https://github.com/Xidrovo/calculadoraESPOL"
                        rel="noopener noreferrer"
                        target="_blank"><strong>borrar caché e intentar de nuevo</strong></a>
                    cómo hacerlo. ¡Gracias!
                </p>
                <p>Creado por Xavier Idrovo Vallejo</p>
            </div>
            <div class="flex flex-col social">
                <div class="link-title">Contacto</div>
                <div class="flex flex-col social-media">
                    <a
                        href="https://github.com/Xidrovo"
                        rel="noopener noreferrer"
                        target="_blank">Github</a>
                    <a
                        href="https://www.linkedin.com/in/xavier-idrovo-vallejo-34a4b2119/"
                        rel="noopener noreferrer"
                        target="_blank">LinkedIn</a>
                    <div>Email: Xidrovo@hotmail.com</div>
                </div>
            </div>
        </div>
    </MediaQuery>
</main>
