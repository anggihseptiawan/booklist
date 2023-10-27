export default function ErrorPage() {
  return (
    <div className="p-4 sm:w-1/2 mx-auto">
      <p className="text-center font-bold text-2xl mb-3">
        Woops, something bad happen!
      </p>
      <img
        src="https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif"
        className="w-full"
        alt="error-image"
      />
    </div>
  )
}
