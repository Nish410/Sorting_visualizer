# Sorting Algorithm Visualizer

# Overview

Welcome to the **Sorting Algorithm Visualizer**! This interactive web application provides a clear and engaging way to understand how different sorting algorithms work. By visualizing the steps of each algorithm, you can grasp concepts like comparisons, swaps, and the overall sorting process in real-time.

This project showcases my understanding of fundamental Data Structures and Algorithms (DSA) and my ability to build interactive front-end applications.

How to View:

My project is deployed using GitHub Pages and can be accessed directly:

* Live Website: [https://nish410.github.io/Sorting_visualizer/]


# Features

* Multiple Algorithms: Visualize common sorting algorithms including:
    * Bubble Sort
    * Selection Sort
    * Insertion Sort
    * Merge Sort 
    * Quick Sort 
* Dynamic Array Generation: Generate new random arrays of varying sizes to test algorithms.
* Adjustable Speed: Control the animation speed to observe the sorting process at your preferred pace.
* Real-time Insights: Displays algorithm information such as time complexity, space complexity, and step-by-step explanations.
* Clear Visual Cues: Uses distinct colors to highlight elements being compared, swapped, or already sorted.

# How It Works

The visualizer is built using standard web technologies:

* HTML: Structures the layout and controls of the application.
* CSS: Styles the visual elements, including the bars and the overall theme.
* JavaScript: Implements the core sorting logic for each algorithm, manipulates the DOM to animate the bars, and handles all user interactions. The algorithms are translated from conceptual C++ logic into JavaScript for web execution.

Each algorithm functions by:
1.  Generating an Array: A random array of numbers is created, represented by bars of varying heights.
2.  User Selection: The user selects a sorting algorithm and initiates the sorting process.
3.  Step-by-Step Visualization:** The JavaScript code executes the chosen algorithm, updating the bar heights and colors at each significant step (comparison, swap) with a small delay to make the animation visible.
4.  Completion: Once sorted, all bars turn a "sorted" color, and the animation stops.

# Technologies Used

* HTML5: For structuring the web page.
* **CSS3: For styling and visual presentation (including dynamic bar coloring).
* **JavaScript (ES6+): For implementing the sorting algorithms, controlling animations, and handling user interactions.
* C++: (Conceptual logic for algorithms, translated to JS for web execution)

# Getting Started (Local Setup)

To run this project locally on your machine:

1.  Clone the repository:**
    ```bash
    git clone [https://github.com/Nish410/sorting_visualizer.git](https://github.com/Nish410/sorting_visualizer.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd sorting_visualizer
    ```
3.  Open `index.html`:
    Simply open the `index.html` file in your preferred web browser (e.g., Chrome, Firefox, Edge).

# Contact

* GitHub: [https://github.com/Nish410](https://github.com/Nish410)
* Email: nsaklani.be22@thapar.edu


# License

This project is open-source and available under the MIT License. See the `LICENSE.md` file for more details.
