$(function () {

  //When Devour button is clicked, updates the Devoured state and moves the burger to the other column.
  $(".devoured-btn").on("click", function (event) {
    const id = $(this).data("id");
    const newDevoured = $(this).data("devoured");

    const newDevouredState = {
      devoured: newDevoured
    };

    let currentURL = window.location.origin;
    $.ajax(currentURL + "/api/burgers/devoured/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function () {
      console.log("changed devoured to", newDevoured);
      // Reloads the page after updating the list
      location.reload();
    });
  });


  // Adds a new Burger to the database by POST request
  $(".burger-form").on("submit", function (event) {
    event.preventDefault();


    if ($("#burger-name").val() === "") {
      console.log("Enter a burger name!");
    } else {
      const newBurger = {
        burger_name: $("#burger-name").val()
      };

      let currentURL = window.location.origin;
      $.post(currentURL + "/api/burgers", newBurger)
        .then(function (data) {
          console.log(data);
          // Reloads the page after updating the list
          location.reload();
        });
    }

  });


  // When Trash it! button is clicked, delete the burger from the page
  $(".delete-btn").on("click", function () {
    const id = $(this).data("id");

    let currentURL = window.location.origin;
    $.ajax(currentURL + "/api/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log(`id: ${id} is deleted!`);
      $(".devoured-burger" + id).remove();

    });

  });

});