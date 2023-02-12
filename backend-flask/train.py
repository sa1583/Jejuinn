import os
import re
from tqdm import tqdm
from konlpy.tag import Mecab
import gensim

def preprocessing():
    filepaths = list_wiki('text')
    with open("output_file.txt", "w") as outfile:
        for filename in filepaths:
            with open(filename) as infile:
                contents = infile.read()
                outfile.write(contents)


def print_list():
    f = open('output_file.txt', encoding="utf8")

    # 전처리 결과 확인
    i = 0
    while True:
        line = f.readline()
        if line != '\n':
            i = i + 1
            print("%d번째 줄 :" % i + line)
        if i == 10:
            break
    f.close()


def morp():
    mecab = Mecab()
    file_m = open('output_file.txt', encoding="utf8")
    lines = file_m.read().splitlines()
    print(len(lines))
    result = []

    for line in tqdm(lines):
        if line:
            result.append(mecab.morphs(line))
    return result


def list_wiki(dirname):
    filepaths = []
    filenames = os.listdir(dirname)
    for filename in filenames:
        filepath = os.path.join(dirname, filename)

        if os.path.isdir(filepath):
            # 재귀 함수
            filepaths.extend(list_wiki(filepath))
        else:
            find = re.findall(r"wiki_[0-9][0-9]", filepath)
            if 0 < len(find):
                filepaths.append(filepath)
    return sorted(filepaths)


if __name__ == '__main__':
    preprocessing()
    print_list()
    result = morp()

    model = gensim.models.word2vec(result, size=100, window=5, min_count=5, workers=4, sg=0)
    model.wv.save_word2vec_format('kowiki.bin')  # 모델 저장

