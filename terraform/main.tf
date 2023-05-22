provider "google" {
  project     = "xiidec"
  region      = "asia-east1"
}

resource "google_storage_bucket" "bucket" {
  name     = "githubusers-terraform"
  location = "asia-east1"

  force_destroy = true
  uniform_bucket_level_access = true
  lifecycle_rule {
    condition {
      age = 1
    }
    action {
      type = "Delete"
    }
  }
}

resource "google_storage_bucket_object" "archive" {
  name   = "backend.zip"
  bucket = google_storage_bucket.bucket.name
  source = "../backend.zip"
}

resource "google_cloudfunctions2_function" "function" {
  name        = "githubusers2"
  description = "githubusers2"
  location = "asia-east1"

  build_config {
    runtime     = "nodejs16"
    entry_point = "githubUsers" 
    source {
      storage_source {
        bucket = google_storage_bucket.bucket.name
        object = google_storage_bucket_object.archive.name
      }
    }
  }
  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60

    secret_environment_variables {
      key = "GHTOKEN"
      version = 1
      project_id = "541848669851"
      secret = "GHTOKEN"
    }
  }
}