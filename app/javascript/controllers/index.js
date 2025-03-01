// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import { application } from "controllers/application"
import MovieSelectionController from "./movie_selection_controller"

application.register("movie-selection", MovieSelectionController)
