/**
 * 字符串匹配
 * 如果在一个字符串A中查找字符串B，那么A就是主串，B是模式串。
 */

/**
 * BF算法：在主串中，检查起始位置分别是0、1、2...n-m,且长度为m的 n-m+1个子串是否有与模式串匹配的字符串。
 * (因为到了n-m的时候还没有查找到，那就是没有这个模式串了)
 * 思想：从string的一个字符开始i=0，判断是否与target的第一个一致j=0，如果是ij都+1.对后续的字符进行判断
 * 如果不是则退出此次循环，从i=1,j=0开始判断，以此类推
 * 如果查找到了就返回成功（i当前值）否则返回-1
 */
 function searchBF(string,target){
    let i = 0,flag = false;
    for(i = 0;i<string.length;){
        let j = 0;
        while(j<target.length){
            if(string[i] == target[j]){
                i++;
                j++;
                flag = true;
                if(j==target.length){
                    return i-j;
                }
                if(i == string.length){
                    return -1;
                }
            }else{
                i = i+1;//从下一个字符串长度开始重新计算
                flag = false;
                break;
            }
        }
    }
    return -1;
}
/**
 * 
 1455. 检查单词是否为句中其他单词的前缀
 https://leetcode-cn.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/
 */
 var isPrefixOfWord = function(sentence, searchWord) {
    sentence = sentence.split(' ');
    for(let i=0;i<sentence.length;i++){
        let word = sentence[i];
        let flag = isSearchWord(word,searchWord);
        if(flag!= -1){
            return i+1;
        }
    }
    return -1;
};
function isSearchWord(word,target){
    let i =0;
    for(i=0;i<word.length;){
        let j = 0;
        while(j<target.length){
            if(word[i] == target[j]){
                i++;
                j++;
                if(j == target.length){
                    if(i==target.length){
                        return i;
                    }else{
                        return -1;
                    }
                }
                if(i == word.length){
                    return -1;
                }
            }else{
                i = i+target.length;
                break;
            }
        }
    }
    return -1;
}

/**
 * 
 *  28. 实现 strStr()
 *  https://leetcode-cn.com/problems/implement-strstr/
 */

    var strStr = function(haystack, needle) {
        if(needle.length==0) return 0;
        let i = 0;
        for(i=0;i<haystack.length;){
            let j = 0;
            while(j<needle.length){
                if(haystack[i] == needle[j]){
                    i++;
                    j++;
                    if(j == needle.length){
                        return i-j;
                    }
                    if(i == haystack.length){
                        return -1;
                    }
                }else{
                    i++;
                    break;
                }
            }
        }
        return -1;
    };


/**
 * RK算法
 * 通过哈希算法对主串中的n-m+1个子串分别求哈希值，然后逐个与模式串的哈希值比较大小。
 * 如果某个子串的哈希值与模式串相等，那就说明对应的子串和模式串匹配了。
 * 
 * 
 * 那么，如何提高哈希算法计算子串哈希值的效率呢？
 * 
 * 假设我们搜索的模式串和主串都是一些英文字母。
 * 首先我们把a-z这26个小写字母用一个二十六进制来表示 ：a=0,z=25，以此类推。
 * 比如 dbc 这个字符串就等于 hash(dbc) 3*26 *26 + 1*26 + 2
 * 
 * 然后我们为了方便计算，先把0-m-1个26的幂次方计算下来
 * 
 * 26^0 26^1 26^2 ...26^m-1
 * 
 * 
 */
function searchRK(string,target){
    let n = string.length,m = target.length,index = 0,hashObj = {};
    let miArray = [];
    let alphabet = {
        'a':0,
        'b':1,
        'c':2,
        'd':3,
        'e':4,
        'f':5,
        'g':6,
        'h':7,
        'i':8,
        'j':9,
        'k':10,
        'l':11,
        'm':12,
        'n':13,
        'o':14,
        'p':15,
        'q':16,
        'r':17,
        's':18,
        't':19,
        'u':20,
        'v':21,
        'w':22,
        'x':23,
        'y':24,
        'z':25

    }
    for(let i = 0;i<m;i++){//为了方便计算，先计算各个幂次方存储起来
        miArray.push(Math.pow(26,i))
    }
    while(index<n){
        let str = string.substr(index,m);
        let  hashString = hash(str,miArray,alphabet);
        hashObj[hashString] = str;
        index = index+m;
    }
    let targetHash = hash(target,miArray,alphabet);
    if(hashObj[targetHash]){
        if(target == hashObj[targetHash]){
            return true
        }
    }
    return false;
}
function hash(string,miArray,alphabet){
    //计算哈希值
    let m = string.length,value = 0;
    for(let i = 0;i<m;i++){
        value += miArray[m-i-1]*(alphabet[string[i]]-alphabet['a'])
    }
    return value;
}

/**
 * BM算法
 * 
 */