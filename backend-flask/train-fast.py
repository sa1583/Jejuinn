import fasttext
import fasttext.util

# Define the training data file path
ft = fasttext.load_model('kowiki.bin')
fasttext.util.reduce_model(ft, 100)
ft.save_model('kowiki.100.bin')
