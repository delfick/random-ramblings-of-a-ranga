<section class="section">
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-two-thirds">
                <slot />
            </div>
        </div>
    </div>
</section>

<style>
    @media print {
        .is-two-thirds {
            width: 90%;
        }
    }
</style>
