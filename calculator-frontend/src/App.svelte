<!-- src/App.svelte -->
<script>
  import { onMount } from 'svelte';
  let number1 = 0;
  let number2 = 0;
  let result = null;

  let expression = "";

  function addToExpression(value) {
	result = null;
    expression += value;
  }

  function clear() {
    expression = "";
	result = null;
  }
  const apiUrl = 'http://localhost:3000/calculate';

  async function calculate() {
    try {
	// request post method to back end server
      const response = await fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }), 
      });

      const data = await response.json();

      if (data.error) {
        result = 'Error';
      } else {
        result = data.result;
		expression = result;
		console.log(expression)
      }
    } catch (error) {
      result = 'Error';
    }
  }
</script>

<main>
  <div class="container">
	<section class="calculator">
		<!-- if start display expression when result is null -->
		{#if result === null}
			<div class="display">{expression}</div>
		{:else}
			<div class="display">{result}</div>
		{/if}
		<!-- If end -->
		<div class="buttons">
		  <div class="row">
			<button on:click={() => addToExpression("7")}>7</button>
			<button on:click={() => addToExpression("8")}>8</button>
			<button on:click={() => addToExpression("9")}>9</button>
			<button on:click={() => addToExpression("*")}>*</button>
		  </div>
		  <div class="row">
			<button on:click={() => addToExpression("4")}>4</button>
			<button on:click={() => addToExpression("5")}>5</button>
			<button on:click={() => addToExpression("6")}>6</button>
			<button on:click={() => addToExpression("/")}>/</button>
		  </div>
		  <div class="row">
			<button on:click={() => addToExpression("1")}>1</button>
			<button on:click={() => addToExpression("2")}>2</button>
			<button on:click={() => addToExpression("3")}>3</button>
			<button on:click={() => addToExpression("+")}>+</button>
		  </div>
		  <div class="row">
			<button on:click={() => addToExpression("0")}>0</button>
			<button on:click={() => addToExpression(".")}>.</button>
			<button on:click={calculate}>=</button>
			<button on:click={() => addToExpression("-")}>-</button>
		  </div>
		  <div class="row">
			<button on:click={clear}>C</button>
		  </div>
		</div>
	  </section>
  </div>
  
</main>

<style>
	.container{
		margin-top: 10%;
	}
	.calculator {
		background-color: #fff;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		width: 200px;
		margin: 0 auto;
	}

	/* Calculator Screen */
	.display {
		background-color: #688EB5;
		border: 1px solid #ccc;
		border-radius: 5px;
		color: #fff;
		padding: 5px;
		text-align: right;
		margin-bottom: 10px;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 5px;
	}

	/* Calculator Buttons */
	button {
		background-color: #CEE8FF;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		font-size: 18px;
		cursor: pointer;
	}

	button:active {
		background-color: #ccc;
	}
</style>
