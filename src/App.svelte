<script>
	import MediaQuery from "./MediaQuery.svelte";
	import Footer from "./Footer.svelte";

	let theoric_porcentage = 0;

	let practique = 0;
	let first = 0;
	let second = 0;
	let third = 0;
	let get_higher_sum_avg = 0;
	let final_score = 0;
	let calculated = false;

	let _settings = {
		maxlength: 3,
		min: "0",
		max: "100",
		type: "number",
	};

	let min_score = 0;

	$: theoric_score = get_higher_sum_avg * (theoric_porcentage / 100);
	$: {
		const int_first = parseInt(first, 10) || 0;
		const int_second = parseInt(second, 10) || 0;
		const int_third = parseInt(third, 10) || 0;

		const to_substract = Math.min(int_first, int_second, int_third);
		const total = int_first + int_second + int_third - to_substract;

		get_higher_sum_avg = total / 2;
	}
	$: practique_Score = practique * ((100 - theoric_porcentage) / 100);

	const handleKeydown = (event) => {
		const keyCode = event.keyCode;

		if (keyCode === 13) {
			const element = document.getElementById("calc-btn");
			element.click();
		}
	};

	const calculate_final = () => {
		if (!calculated) {
			calculated = true;
		}
		const result = theoric_score + practique_Score;
		final_score = fixed(result);
		get_min_score(result);
	};

	const get_min_score = (value) => {
		if (value < 60) {
			const max_value = Math.max(first, second);
			const result =
				((60 - practique_Score) * 2) / (theoric_porcentage / 100) -
				max_value;
			// min_score = Math.abs(result);
			if (isFinite(result)) {
				min_score = fixed(Math.abs(result));
			}
		}
	};

	const fixed = (number) => {
		return Math.round((number + Number.EPSILON) * 100) / 100;
	};

	const cut_max_value = (value) => {
		if (value > 100) {
			return 100;
		}
		if (value < 0) {
			return 0;
		}
		return parseInt(value, 10);
	};

	const value_by_name = (name, value) => {
		switch (name) {
			case "theoric":
				theoric_porcentage = cut_max_value(value);
				return;
			case "first":
				first = cut_max_value(value);
				return;
			case "second":
				second = cut_max_value(value);
				return;
			case "third":
				third = cut_max_value(value);
				return;
			case "practique":
				practique = cut_max_value(value);
				return;
			default:
				return 0;
		}
	};

	const handle_change = (evt) => {
		const { target } = evt;
		const { value, name } = target;
		const parsed_value = parseInt(value, 10);
		value_by_name(name, parsed_value);
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<div class="w-full nav-style">
		<div class="m-nav text-white semibold title">
			Calculadora de promedios ESPOL
		</div>
	</div>
	<div class="container">
		<div class="input-container flex-row h-input my-auto">
			<div class="w-left my-auto flex-col flex">
				<div class="flex flex-col mb-2 mt-2">
					<label class="flex flex-col" for="theoric">
						<p class="text-label">Porcentaje teórico</p>
						<input
							on:input|preventDefault={handle_change}
							placeholder="ej: 80"
							name="theoric"
							class="max-m-input"
							{..._settings}
							bind:value={theoric_porcentage} />
					</label>
				</div>
				<MediaQuery query="(min-width: 1281px)" let:matches>
					<div class="flex flex-col">
						<div
							class={`flex ${matches ? 'flex-row' : 'flex-col'}`}>
							<div class="mr-4">
								<label class="flex flex-col" for="first">
									<p class="text-label">
										Primer Parcial sobre 100
									</p>
									<input
										{..._settings}
										on:input|preventDefault={handle_change}
										name="first"
										placeholder="ej: 80"
										bind:value={first} />
								</label>
							</div>
							<div>
								<label class="flex flex-col" for="second">
									<p class="text-label" Primer>
										Parcial sobre 100
									</p>
									<input
										on:input|preventDefault={handle_change}
										name="second"
										placeholder="ej: 75"
										{..._settings}
										bind:value={second} />
								</label>
							</div>
						</div>
						<div
							class={`flex ${matches ? 'flex-row' : 'flex-col mb-2'}`}>
							<div class="mr-4">
								<label class="flex flex-col" for="practique">
									<p class="text-label">Nota prácitca</p>
									<input
										on:input|preventDefault={handle_change}
										name="practique"
										placeholder="ej: 90"
										{..._settings}
										bind:value={practique} /></label>
							</div>
							<div>
								<label class="flex flex-col" for="third">
									<p class="text-label">Mejoramiento</p>
									<input
										on:input|preventDefault={handle_change}
										name="third"
										placeholder="ej: 90"
										{..._settings}
										bind:value={third} /></label>
							</div>
						</div>
					</div>
				</MediaQuery>
			</div>
			<MediaQuery query="(min-width: 1281px)" let:matches>
				{#if matches}
					<div
						class={`w-right flex flex-col justify-around h-full ${!calculated && 'hidden'}`}>
						<div
							class={`veredict-text failed w-half ${final_score >= 60 ? 'aproved-text' : 'failed-text '}`}>
							<div>
								{`${final_score >= 60 ? '¡ Felicidades has Aprobado :D !' : '¡ Oh no has Reprobado :( !'}`}
							</div>
							<div class="bold margin-score">
								{final_score}
								de 100
							</div>
						</div>
						{#if final_score < 60}
							<div
								class={`veredict-text failed w-half ${final_score >= 60 ? 'aproved-text' : 'failed-text '}`}>
								<div>Nota mínima para aprobar</div>
								<div class="bold margin-score">
									{min_score}
									de 100
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</MediaQuery>
		</div>
		<MediaQuery query="(min-width: 1281px)" let:matches>
			<div class="w-full align-center flex flex-row justify-center">
				<button
					id="calc-btn"
					class="button"
					on:click={calculate_final}>¡Calcular!</button>
			</div>
		</MediaQuery>
		<MediaQuery query="(min-width: 1281px)" let:matches>
			{#if !matches}
				<div
					class={`block w-right flex flex-col ${!calculated && 'none'}`}>
					<div
						class={`veredict-text failed ${final_score >= 60 ? 'aproved-text' : 'failed-text '}`}>
						<div>
							{`${final_score >= 60 ? '¡ Felicidades has Aprobado :D !' : '¡ Oh no has Reprobado :( !'}`}
						</div>
						<div class="bold margin-score">
							{final_score}
							de 100
						</div>
					</div>
					{#if final_score < 60}
						<div
							class={`veredict-text failed ${final_score >= 60 ? 'aproved-text' : 'failed-text '}`}>
							<div>Nota mínima para aprobar</div>
							<div class="bold margin-score">
								{min_score}
								de 100
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</MediaQuery>
	</div>
	<Footer />
</main>
