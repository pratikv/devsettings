
// emcc 2.c -s WASM=1 -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_foo','_foo1']" -s STRICT=1 -o 2.html

int foo(){
	return 101;
}

float foo1( float a, float b) { return a + b; }
