# Google Vision cli tool

A quick and basic wrapper around the [google cloud vision http api](https://cloud.google.com/vision/reference/rest/v1/images/annotate)

### env var

You'll need `GOOGLE_API_KEY` set to your "browser key", see Google Cloud Platform -> Apis for instructions on how to set this up
I have one if anyone needs it, the google vision needs billing to be set up before you can use it

### instructions

`npm install`

Takes an image, base64 encodes it and sends it to the google vision api for checking

Accepts the following params:

* `--image` - the path to the image you wish to check
* `--type` - the type of scan you want to do, full list below. Only 1 at a time at the mo
* `--limit` - the number of results you want back

e.g.

`node index.js --image callas.jpg --type LOGO_DETECTION --limit 1`

Will return the following:

```
-
  logoAnnotations:
    -
      description:  Warner Music Group
      score:        0.15346922
      boundingPoly:
        vertices:
          -
            x: 14
            y: 17
          -
            x: 27
            y: 17
          -
            x: 27
            y: 27
          -
            x: 14
            y: 27

```

You can also use `make run` with `IMAGE` `TYPE` or `LIMIT` params, to run it in docker

It uses `prettyjson` for a nice colourful yml version of the response

#### Types list:

* `TYPE_UNSPECIFIED`	Unspecified feature type.
* `FACE_DETECTION`	Run face detection.
* `LANDMARK_DETECTION`	Run landmark detection.
* `LOGO_DETECTION`	Run logo detection.
* `LABEL_DETECTION`	Run label detection.
* `TEXT_DETECTION`	Run OCR.
* `SAFE_SEARCH_DETECTION`	Run various computer vision models to
* `IMAGE_PROPERTIES`	Compute a set of properties about the image (such as the image's dominant colors)
