// Main JavaScript File for Uzima Cleaners Kenya

$(document).ready(function () {
  // Mobile Menu Toggle
  $(".navbar-toggler").click(function () {
    $(this).toggleClass("active");
  });

  // Dropdown Menu on Hover (for desktop)
  function toggleDropdown(e) {
    const dropdown = $(this).closest(".dropdown");
    const menu = $(".dropdown-menu", dropdown);

    dropdown.toggleClass("show", e.type === "mouseenter");
    menu.toggleClass("show", e.type === "mouseenter");

    // Update aria-expanded attribute
    const isExpanded = e.type === "mouseenter";
    $(".dropdown-toggle", dropdown).attr("aria-expanded", isExpanded);
  }

  // Apply to all dropdowns with data-toggle="hover"
  $('.dropdown[data-toggle="hover"]').on(
    "mouseenter mouseleave",
    toggleDropdown
  );

  // Close dropdown when clicking outside
  $(document).click(function (e) {
    if (!$(e.target).closest(".dropdown").length) {
      $(".dropdown").removeClass("show");
      $(".dropdown-menu").removeClass("show");
      $(".dropdown-toggle").attr("aria-expanded", "false");
    }
  });

  // Form Validation
  $("#quoteForm").validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 10,
      },
      service: "required",
      address: "required",
      agree: "required",
    },
    messages: {
      name: "Please enter your name",
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address",
      },
      phone: {
        required: "Please enter your phone number",
        minlength: "Your phone number must be at least 10 characters long",
      },
      service: "Please select a service",
      address: "Please enter your property address",
      agree: "Please agree to our terms",
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    },
    submitHandler: function (form) {
      // Simulate form submission
      $("#quoteForm").fadeOut(300, function () {
        $("#formSuccess").fadeIn(300);
      });

      // In a real application, you would submit the form via AJAX here
      // $.ajax({
      //     url: "process-form.php",
      //     type: "POST",
      //     data: $(form).serialize(),
      //     success: function(response) {
      //         $('#quoteForm').fadeOut(300, function() {
      //             $('#formSuccess').fadeIn(300);
      //         });
      //     }
      // });

      return false;
    },
  });

  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Counter Animation
  $(".counter").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 2000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  // Scroll Reveal Animations
  ScrollReveal().reveal(
    ".service-card, .team-card, .portfolio-item, .gallery-item",
    {
      interval: 100,
      reset: true,
      origin: "bottom",
      distance: "20px",
    }
  );

  // Smooth Scrolling for Anchor Links
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 80,
      },
      500,
      "linear"
    );
  });

  // Active Nav Link on Scroll
  const sections = $("section");
  const navItems = $(".navbar-nav .nav-link");

  $(window).on("scroll", function () {
    const currentPos = $(this).scrollTop();

    sections.each(function () {
      const top = $(this).offset().top - 100;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr("id");

      if (currentPos >= top && currentPos <= bottom) {
        navItems.removeClass("active");
        $(".navbar-nav").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // Initialize LightGallery for image gallery
  $("#lightgallery").lightGallery({
    selector: ".gallery-item",
    download: false,
    counter: false,
  });

  // Service Filter
  $(".portfolio-filter button").click(function () {
    const filterValue = $(this).attr("data-filter");

    $(".portfolio-filter button").removeClass("active");
    $(this).addClass("active");

    if (filterValue === "all") {
      $(".portfolio-item").show("1000");
    } else {
      $(".portfolio-item").not(`.${filterValue}`).hide("3000");
      $(".portfolio-item").filter(`.${filterValue}`).show("3000");
    }
  });

  // Gallery Filter
  $(".gallery-filter button").click(function () {
    const filterValue = $(this).attr("data-filter");

    $(".gallery-filter button").removeClass("active");
    $(this).addClass("active");

    if (filterValue === "all") {
      $(".gallery-item").show("1000");
    } else {
      $(".gallery-item").not(`[data-category="${filterValue}"]`).hide("3000");
      $(".gallery-item")
        .filter(`[data-category="${filterValue}"]`)
        .show("3000");
    }
  });
});
