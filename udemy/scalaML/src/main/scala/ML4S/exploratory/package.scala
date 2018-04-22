package ML4S.exploratory

import ML4S.exploratory.NearestNeighbours
import breeze.linalg.{DenseMatrix, DenseVector}

import scala.io.Source


object NNExample extends App {

  val arr = DenseMatrix(List(List(5,3), List(8,2)).toArray:_*)
  var a = arr(0 to 1, ::);
  println(a)

}
